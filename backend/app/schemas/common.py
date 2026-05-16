# common.py placeholder
from datetime import date
from typing import Optional, Union

from pydantic import BaseModel, EmailStr


# User schemas
class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    role: str = "customer"


class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    role: str

    class Config:
        from_attributes = True


# Authentication
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    user_id: Optional[int] = None


# Vehicle schemas
class VehicleOut(BaseModel):
    id: int
    title: str
    category: str
    city: str
    state: str
    seats: int
    transmission: str
    fuel_type: str
    price_per_day: float
    rating: float
    reviews: int
    image_url: str

    class Config:
        from_attributes = True


class VehicleCreate(BaseModel):
    title: str
    category: str
    city: str
    state: str
    seats: int
    transmission: str
    fuel_type: str
    price_per_day: float
    image_url: Optional[str] = None


# Booking schemas
class BookingCreate(BaseModel):
    vehicle_id: int
    start_date: date
    end_date: date


class BookingOut(BaseModel):
    id: int
    vehicle_title: str
    city: str
    state: str
    start_date: date
    end_date: date
    total_price: float
    status: str

    class Config:
        from_attributes = True


# Payment schemas
class PaymentOut(BaseModel):
    id: int
    booking_id: int
    amount: float
    status: str
    method: str

    class Config:
        from_attributes = True


# Notification schemas
class NotificationOut(BaseModel):
    id: int
    title: str
    message: str
    type: str
    is_read: bool

    class Config:
        from_attributes = True


# Review schemas
class ReviewCreate(BaseModel):
    booking_id: int
    rating: int
    comment: Optional[str] = None


class ReviewOut(BaseModel):
    id: int
    booking_id: int
    reviewer_id: int
    rating: int
    comment: Optional[str] = None

    class Config:
        from_attributes = True


# Favorite schemas
class FavoriteCreate(BaseModel):
    vehicle_id: int


class FavoriteOut(BaseModel):
    id: int
    vehicle_id: int
    vehicle: VehicleOut

    class Config:
        from_attributes = True
