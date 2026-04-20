from sqlalchemy.orm import Session

from app.models.booking import Booking
from app.schemas.booking import BookingCreate


def create_booking(db: Session, payload: BookingCreate) -> Booking:
    booking = Booking(**payload.model_dump())
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking


def get_bookings(db: Session) -> list[Booking]:
    return db.query(Booking).all()
