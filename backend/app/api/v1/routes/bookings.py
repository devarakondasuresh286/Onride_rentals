from datetime import date

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.booking import Booking
from app.models.vehicle import Vehicle
from app.schemas.common import BookingCreate, BookingOut
from app.services.booking_service import calculate_total_price, has_booking_conflict


router = APIRouter()


@router.get("", response_model=list[dict])
def list_bookings(current_user = Depends(get_current_user), db: Session = Depends(get_db)) -> list[dict]:
    """List all bookings for a user"""
    bookings = db.query(Booking).filter(Booking.user_id == current_user.id).all()
    
    result = []
    for booking in bookings:
        vehicle = db.query(Vehicle).filter(Vehicle.id == booking.vehicle_id).first()
        if vehicle:
            result.append({
                "id": booking.id,
                "vehicle_title": vehicle.title,
                "city": vehicle.city,
                "state": vehicle.state,
                "start_date": booking.start_date,
                "end_date": booking.end_date,
                "total_price": booking.total_price,
                "status": booking.status,
                "image_url": vehicle.image_url,
            })
    
    return result


@router.post("", response_model=dict)
def create_booking(
    payload: BookingCreate,
    current_user = Depends(get_current_user),  # In production, get from auth token
    db: Session = Depends(get_db),
) -> dict:
    """Create a new booking"""
    # Verify vehicle exists
    vehicle = db.query(Vehicle).filter(Vehicle.id == payload.vehicle_id).first()
    if not vehicle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehicle not found",
        )
    
    # Check for booking conflicts
    conflicts = db.query(Booking).filter(
        (Booking.vehicle_id == payload.vehicle_id),
        (Booking.status.in_(["upcoming", "completed"])),
    ).all()
    
    for conflict in conflicts:
        if has_booking_conflict(
            payload.start_date, payload.end_date,
            conflict.start_date, conflict.end_date
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Vehicle is not available for the selected dates",
            )
    
    # Calculate total price
    days = (payload.end_date - payload.start_date).days + 1
    total_price = calculate_total_price(days=days, daily_rate=vehicle.price_per_day)
    
    # Create booking
    booking = Booking(
        user_id=current_user.id,
        vehicle_id=payload.vehicle_id,
        start_date=payload.start_date,
        end_date=payload.end_date,
        total_price=total_price,
        status="upcoming",
        payment_status="pending",
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)
    
    return {
        "id": booking.id,
        "message": "Booking created successfully",
        "total_price": total_price,
        "status": booking.status,
    }


@router.get("/{booking_id}", response_model=dict)
def get_booking(
    booking_id: int,
    current_user = Depends(get_current_user),  # In production, get from auth token
    db: Session = Depends(get_db),
) -> dict:
    """Get a specific booking"""
    booking = db.query(Booking).filter(
        (Booking.id == booking_id) & (Booking.user_id == current_user.id)
    ).first()
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found",
        )
    
    vehicle = db.query(Vehicle).filter(Vehicle.id == booking.vehicle_id).first()
    
    return {
        "id": booking.id,
        "vehicle_title": vehicle.title if vehicle else "Unknown",
        "city": vehicle.city if vehicle else "Unknown",
        "state": vehicle.state if vehicle else "Unknown",
        "start_date": booking.start_date,
        "end_date": booking.end_date,
        "total_price": booking.total_price,
        "status": booking.status,
    }


@router.put("/{booking_id}", response_model=dict)
def update_booking_status(
    booking_id: int,
    status: str,
    current_user = Depends(get_current_user),  # In production, get from auth token
    db: Session = Depends(get_db),
) -> dict:
    """Update booking status (cancel, complete, etc)"""
    booking = db.query(Booking).filter(
        (Booking.id == booking_id) & (Booking.user_id == current_user.id)
    ).first()
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found",
        )
    
    if status not in ["upcoming", "completed", "cancelled"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid status",
        )
    
    booking.status = status
    db.commit()
    
    return {
        "id": booking.id,
        "message": f"Booking {status} successfully",
        "status": booking.status,
    }


@router.delete("/{booking_id}", response_model=dict)
def cancel_booking(
    booking_id: int,
    current_user = Depends(get_current_user),  # In production, get from auth token
    db: Session = Depends(get_db),
) -> dict:
    """Cancel a booking"""
    booking = db.query(Booking).filter(
        (Booking.id == booking_id) & (Booking.user_id == current_user.id)
    ).first()
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found",
        )
    
    if booking.status == "completed":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot cancel a completed booking",
        )
    
    booking.status = "cancelled"
    db.commit()
    
    return {"message": "Booking cancelled successfully"}
