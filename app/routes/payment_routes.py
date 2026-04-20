from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.controllers.payment_controller import create_payment, get_payments
from app.core.database import get_db
from app.schemas.payment import PaymentCreate, PaymentOut

router = APIRouter(prefix="/payments", tags=["Payments"])


@router.post("", response_model=PaymentOut)
def create_payment_route(payload: PaymentCreate, db: Session = Depends(get_db)):
    return create_payment(db, payload)


@router.get("", response_model=list[PaymentOut])
def get_payments_route(db: Session = Depends(get_db)):
    return get_payments(db)
