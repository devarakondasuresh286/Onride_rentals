from sqlalchemy.orm import Session

from app.models.payment import Payment
from app.schemas.payment import PaymentCreate


def create_payment(db: Session, payload: PaymentCreate) -> Payment:
    payment = Payment(**payload.model_dump())
    db.add(payment)
    db.commit()
    db.refresh(payment)
    return payment


def get_payments(db: Session) -> list[Payment]:
    return db.query(Payment).all()
