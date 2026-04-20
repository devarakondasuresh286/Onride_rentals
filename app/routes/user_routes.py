from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.controllers.user_controller import create_user, get_users
from app.core.database import get_db
from app.schemas.user import UserCreate, UserOut

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("", response_model=UserOut)
def create_user_route(payload: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, payload)


@router.get("", response_model=list[UserOut])
def get_users_route(db: Session = Depends(get_db)):
    return get_users(db)
