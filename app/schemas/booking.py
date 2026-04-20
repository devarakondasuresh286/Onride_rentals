from datetime import date

from pydantic import BaseModel, ConfigDict


class BookingCreate(BaseModel):
    customer_id: int
    vehicle_id: int
    start_date: date
    end_date: date
    status: str = "pending"


class BookingOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    customer_id: int
    vehicle_id: int
    start_date: date
    end_date: date
    status: str
