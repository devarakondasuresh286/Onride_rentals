from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, Text, func

from app.models.base import Base


class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String(120), nullable=False)
    category = Column(String(30), nullable=False)
    city = Column(String(80), nullable=False)
    state = Column(String(80), nullable=False)
    seats = Column(Integer, nullable=False)
    transmission = Column(String(20), nullable=False)
    fuel_type = Column(String(30), nullable=False)
    price_per_day = Column(Float, nullable=False)
    image_url = Column(Text, nullable=True)
    status = Column(String(20), default="active")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
