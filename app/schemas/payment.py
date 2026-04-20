from pydantic import BaseModel, ConfigDict


class PaymentCreate(BaseModel):
    booking_id: int
    amount: float
    method: str
    status: str = "initiated"


class PaymentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    booking_id: int
    amount: float
    method: str
    status: str
