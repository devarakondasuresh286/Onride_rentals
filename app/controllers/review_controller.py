from sqlalchemy.orm import Session

from app.models.review import Review
from app.schemas.review import ReviewCreate


def create_review(db: Session, payload: ReviewCreate) -> Review:
    review = Review(**payload.model_dump())
    db.add(review)
    db.commit()
    db.refresh(review)
    return review


def get_reviews(db: Session) -> list[Review]:
    return db.query(Review).all()
