from pydantic import BaseModel, ConfigDict


class ReviewCreate(BaseModel):
    customer_id: int
    vehicle_id: int
    rating: float
    comment: str | None = None
    visibility: str = "public"


class ReviewOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    customer_id: int
    vehicle_id: int
    rating: float
    comment: str | None
    visibility: str
