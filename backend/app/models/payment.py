# payment.py placeholder
from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, func

from app.models.base import Base


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    booking_id = Column(Integer, ForeignKey("bookings.id"), nullable=False)
    amount = Column(Float, nullable=False)
    method = Column(String(50), nullable=False)
    status = Column(String(20), default="pending")
    transaction_ref = Column(String(100), nullable=True)
    paid_at = Column(DateTime(timezone=True), server_default=func.now())
