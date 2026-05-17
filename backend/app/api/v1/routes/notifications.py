from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.notification import Notification
from app.schemas.common import NotificationOut
from pydantic import BaseModel


router = APIRouter()


class NotificationCreate(BaseModel):
    title: str
    message: str
    type: str


@router.get("", response_model=list[dict])
def list_notifications(user_id: int = 1, db: Session = Depends(get_db)) -> list[dict]:
    """List all notifications for a user"""
    notifications = db.query(Notification).filter(
        Notification.user_id == user_id
    ).order_by(Notification.created_at.desc()).all()
    
    return [
        {
            "id": n.id,
            "title": n.title,
            "message": n.message,
            "type": n.type,
            "is_read": n.is_read,
            "created_at": n.created_at.isoformat() if n.created_at else None,
        }
        for n in notifications
    ]


@router.get("/{notification_id}", response_model=dict)
def get_notification(
    notification_id: int,
    user_id: int = 1,
    db: Session = Depends(get_db),
) -> dict:
    """Get a specific notification"""
    notification = db.query(Notification).filter(
        (Notification.id == notification_id) & (Notification.user_id == user_id)
    ).first()
    
    if not notification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found",
        )
    
    return {
        "id": notification.id,
        "title": notification.title,
        "message": notification.message,
        "type": notification.type,
        "is_read": notification.is_read,
    }


@router.post("", response_model=dict)
def create_notification(
    payload: NotificationCreate,
    user_id: int = 1,
    db: Session = Depends(get_db),
) -> dict:
    """Create a new notification"""
    notification = Notification(
        user_id=user_id,
        title=payload.title,
        message=payload.message,
        type=payload.type,
        is_read=False,
    )
    db.add(notification)
    db.commit()
    db.refresh(notification)
    
    return {
        "id": notification.id,
        "message": "Notification created successfully",
    }


@router.put("/{notification_id}", response_model=dict)
def mark_as_read(
    notification_id: int,
    user_id: int = 1,
    db: Session = Depends(get_db),
) -> dict:
    """Mark a notification as read"""
    notification = db.query(Notification).filter(
        (Notification.id == notification_id) & (Notification.user_id == user_id)
    ).first()
    
    if not notification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found",
        )
    
    notification.is_read = True
    db.commit()
    
    return {
        "id": notification.id,
        "message": "Notification marked as read",
    }


@router.put("/mark-all-as-read", response_model=dict)
def mark_all_as_read(
    user_id: int = 1,
    db: Session = Depends(get_db),
) -> dict:
    """Mark all notifications as read"""
    db.query(Notification).filter(Notification.user_id == user_id).update(
        {"is_read": True}
    )
    db.commit()
    
    return {"message": "All notifications marked as read"}
