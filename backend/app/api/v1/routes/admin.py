from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.core.database import get_db
from app.models.user import User
from app.models.vehicle import Vehicle
from app.models.booking import Booking
from app.models.payment import Payment
from app.models.review import Review


router = APIRouter()


@router.get("/summary", response_model=dict)
def admin_summary(db: Session = Depends(get_db)) -> dict:
    """Get admin dashboard summary"""
    # Calculate revenue
    payments = db.query(func.sum(Payment.amount)).filter(
        Payment.status == "completed"
    ).scalar() or 0
    
    # Count active bookings
    bookings_count = db.query(func.count(Booking.id)).filter(
        Booking.status.in_(["upcoming", "completed"])
    ).scalar() or 0
    
    # Count vehicles
    vehicles_count = db.query(func.count(Vehicle.id)).filter(
        Vehicle.status == "active"
    ).scalar() or 0
    
    # Count users
    users_count = db.query(func.count(User.id)).scalar() or 0
    
    # Count pending reviews
    pending_reviews = db.query(func.count(Review.id)).scalar() or 0
    
    return {
        "revenue": float(payments),
        "bookings": int(bookings_count),
        "vehicles": int(vehicles_count),
        "users": int(users_count),
        "pending_reviews": int(pending_reviews),
    }


@router.get("/users", response_model=list[dict])
def list_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
) -> list[dict]:
    """List all users"""
    users = db.query(User).offset(skip).limit(limit).all()
    
    return [
        {
            "id": u.id,
            "first_name": u.first_name,
            "last_name": u.last_name,
            "email": u.email,
            "role": u.role,
            "is_active": u.is_active,
        }
        for u in users
    ]


@router.get("/vehicles", response_model=list[dict])
def list_all_vehicles(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
) -> list[dict]:
    """List all vehicles"""
    vehicles = db.query(Vehicle).offset(skip).limit(limit).all()
    
    return [
        {
            "id": v.id,
            "title": v.title,
            "category": v.category,
            "city": v.city,
            "state": v.state,
            "price_per_day": v.price_per_day,
            "status": v.status,
        }
        for v in vehicles
    ]


@router.get("/bookings", response_model=list[dict])
def list_all_bookings(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
) -> list[dict]:
    """List all bookings"""
    bookings = db.query(Booking).offset(skip).limit(limit).all()
    
    return [
        {
            "id": b.id,
            "user_id": b.user_id,
            "vehicle_id": b.vehicle_id,
            "start_date": b.start_date.isoformat() if b.start_date else None,
            "end_date": b.end_date.isoformat() if b.end_date else None,
            "total_price": b.total_price,
            "status": b.status,
            "payment_status": b.payment_status,
        }
        for b in bookings
    ]


@router.get("/reviews", response_model=list[dict])
def list_all_reviews(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
) -> list[dict]:
    """List all reviews"""
    reviews = db.query(Review).offset(skip).limit(limit).all()
    
    return [
        {
            "id": r.id,
            "booking_id": r.booking_id,
            "reviewer_id": r.reviewer_id,
            "rating": r.rating,
            "comment": r.comment,
        }
        for r in reviews
    ]


@router.get("/revenue-stats", response_model=dict)
def get_revenue_stats(db: Session = Depends(get_db)) -> dict:
    """Get revenue statistics"""
    total_revenue = db.query(func.sum(Payment.amount)).filter(
        Payment.status == "completed"
    ).scalar() or 0
    
    completed_bookings = db.query(func.count(Booking.id)).filter(
        Booking.status == "completed"
    ).scalar() or 0
    
    pending_payments = db.query(func.sum(Payment.amount)).filter(
        Payment.status == "pending"
    ).scalar() or 0
    
    return {
        "total_revenue": float(total_revenue),
        "completed_bookings": int(completed_bookings),
        "pending_amount": float(pending_payments),
    }
