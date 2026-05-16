# notification.py placeholder
from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text, func

from app.models.base import Base


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String(120), nullable=False)
    message = Column(Text, nullable=False)
    type = Column(String(30), nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
