# favorite.py placeholder
from sqlalchemy import Column, DateTime, ForeignKey, Integer, func

from app.models.base import Base


class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
