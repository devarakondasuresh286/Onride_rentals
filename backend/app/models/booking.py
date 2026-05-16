# booking.py placeholder
from sqlalchemy import Column, Date, DateTime, Float, ForeignKey, Integer, String, func

from app.models.base import Base


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    total_price = Column(Float, nullable=False)
    status = Column(String(20), default="upcoming")
    payment_status = Column(String(20), default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
