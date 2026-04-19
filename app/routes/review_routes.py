from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.controllers.review_controller import create_review, get_reviews
from app.core.database import get_db
from app.schemas.review import ReviewCreate, ReviewOut

router = APIRouter(prefix="/reviews", tags=["Reviews"])


@router.post("", response_model=ReviewOut)
def create_review_route(payload: ReviewCreate, db: Session = Depends(get_db)):
    return create_review(db, payload)


@router.get("", response_model=list[ReviewOut])
def get_reviews_route(db: Session = Depends(get_db)):
    return get_reviews(db)
