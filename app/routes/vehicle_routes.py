from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.controllers.vehicle_controller import create_vehicle, get_vehicles
from app.core.database import get_db
from app.schemas.vehicle import VehicleCreate, VehicleOut

router = APIRouter(prefix="/vehicles", tags=["Vehicles"])


@router.post("", response_model=VehicleOut)
def create_vehicle_route(payload: VehicleCreate, db: Session = Depends(get_db)):
    return create_vehicle(db, payload)


@router.get("", response_model=list[VehicleOut])
def get_vehicles_route(db: Session = Depends(get_db)):
    return get_vehicles(db)
