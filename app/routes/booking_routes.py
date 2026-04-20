from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.controllers.booking_controller import create_booking, get_bookings
from app.core.database import get_db
from app.schemas.booking import BookingCreate, BookingOut

router = APIRouter(prefix="/bookings", tags=["Bookings"])


@router.post("", response_model=BookingOut)
def create_booking_route(payload: BookingCreate, db: Session = Depends(get_db)):
    return create_booking(db, payload)


@router.get("", response_model=list[BookingOut])
def get_bookings_route(db: Session = Depends(get_db)):
    return get_bookings(db)
