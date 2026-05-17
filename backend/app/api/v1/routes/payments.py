from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.payment import Payment
from app.models.booking import Booking
from app.schemas.common import PaymentOut
from pydantic import BaseModel


router = APIRouter()


class PaymentCreate(BaseModel):
    booking_id: int
    method: str = "card"


class PaymentUpdate(BaseModel):
    status: str


@router.get("", response_model=list[dict])
def list_payments(user_id: int = 1, db: Session = Depends(get_db)) -> list[dict]:
    """List all payments for a user"""
    payments = db.query(Payment).join(
        Booking, Payment.booking_id == Booking.id
    ).filter(Booking.user_id == user_id).all()
    
    return [
        {
            "id": p.id,
            "booking_id": p.booking_id,
            "amount": p.amount,
            "status": p.status,
            "method": p.method,
        }
        for p in payments
    ]


@router.get("/{payment_id}", response_model=dict)
def get_payment(
    payment_id: int,
    user_id: int = 1,
    db: Session = Depends(get_db),
) -> dict:
    """Get a specific payment"""
    payment = db.query(Payment).filter(Payment.id == payment_id).first()
    
    if not payment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found",
        )
    
    # Verify user owns this booking
    booking = db.query(Booking).filter(Booking.id == payment.booking_id).first()
    if booking.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Unauthorized",
        )
    
    return {
        "id": payment.id,
        "booking_id": payment.booking_id,
        "amount": payment.amount,
        "status": payment.status,
        "method": payment.method,
    }


@router.post("", response_model=dict)
def create_payment(
    payload: PaymentCreate,
    user_id: int = 1,
    db: Session = Depends(get_db),
) -> dict:
    """Create a new payment"""
    # Verify booking exists and belongs to user
    booking = db.query(Booking).filter(Booking.id == payload.booking_id).first()
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found",
        )
    
    if booking.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Unauthorized",
        )
    
    # Create payment
    payment = Payment(
        booking_id=payload.booking_id,
        amount=booking.total_price,
        method=payload.method,
        status="completed",
    )
    db.add(payment)
    
    # Update booking payment status
    booking.payment_status = "completed"
    db.commit()
    db.refresh(payment)
    
    return {
        "id": payment.id,
        "booking_id": payment.booking_id,
        "amount": payment.amount,
        "status": payment.status,
        "message": "Payment processed successfully",
    }


@router.put("/{payment_id}", response_model=dict)
def update_payment(
    payment_id: int,
    payload: PaymentUpdate,
    user_id: int = 1,
    db: Session = Depends(get_db),
) -> dict:
    """Update payment status"""
    payment = db.query(Payment).filter(Payment.id == payment_id).first()
    
    if not payment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found",
        )
    
    # Verify user authorization
    booking = db.query(Booking).filter(Booking.id == payment.booking_id).first()
    if booking.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Unauthorized",
        )
    
    payment.status = payload.status
    db.commit()
    
    return {
        "id": payment.id,
        "status": payment.status,
        "message": "Payment updated successfully",
    }

