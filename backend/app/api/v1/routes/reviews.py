from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.booking import Booking
from app.models.review import Review
from app.models.vehicle import Vehicle
from app.schemas.common import ReviewCreate


router = APIRouter()


@router.get("/my", response_model=list[dict])
def list_my_reviews(current_user=Depends(get_current_user), db: Session = Depends(get_db)) -> list[dict]:
    reviews = (
        db.query(Review)
        .filter(Review.reviewer_id == current_user.id)
        .order_by(Review.created_at.desc())
        .all()
    )

    result = []
    for review in reviews:
        booking = db.query(Booking).filter(Booking.id == review.booking_id).first()
        vehicle = db.query(Vehicle).filter(Vehicle.id == booking.vehicle_id).first() if booking else None
        result.append(
            {
                "id": review.id,
                "booking_id": review.booking_id,
                "reviewer_id": review.reviewer_id,
                "rating": review.rating,
                "comment": review.comment,
                "created_at": review.created_at.isoformat() if review.created_at else None,
                "vehicle_title": vehicle.title if vehicle else "Unknown",
            }
        )

    return result


@router.get("/vehicle/{vehicle_id}", response_model=list[dict])
def list_vehicle_reviews(vehicle_id: int, db: Session = Depends(get_db)) -> list[dict]:
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found")

    reviews = (
        db.query(Review)
        .join(Booking, Review.booking_id == Booking.id)
        .filter(Booking.vehicle_id == vehicle_id)
        .order_by(Review.created_at.desc())
        .all()
    )

    return [
        {
            "id": review.id,
            "booking_id": review.booking_id,
            "reviewer_id": review.reviewer_id,
            "rating": review.rating,
            "comment": review.comment,
            "created_at": review.created_at.isoformat() if review.created_at else None,
        }
        for review in reviews
    ]


@router.post("", response_model=dict)
def create_review(
    payload: ReviewCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    booking = db.query(Booking).filter(Booking.id == payload.booking_id).first()
    if not booking:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")

    if booking.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized")

    existing_review = db.query(Review).filter(Review.booking_id == payload.booking_id).first()
    if existing_review:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Review already submitted")

    review = Review(
        booking_id=payload.booking_id,
        reviewer_id=current_user.id,
        rating=payload.rating,
        comment=payload.comment,
    )
    db.add(review)
    db.commit()
    db.refresh(review)

    return {
        "id": review.id,
        "booking_id": review.booking_id,
        "reviewer_id": review.reviewer_id,
        "rating": review.rating,
        "comment": review.comment,
        "message": "Review created successfully",
    }