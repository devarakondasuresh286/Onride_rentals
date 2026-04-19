from pydantic import BaseModel, ConfigDict


class VehicleCreate(BaseModel):
    title: str
    brand: str
    model: str
    price_per_day: float
    location: str
    owner_id: int


class VehicleOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    brand: str
    model: str
    price_per_day: float
    location: str
    owner_id: int
