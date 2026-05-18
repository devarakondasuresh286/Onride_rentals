from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.vehicle import Vehicle
from app.models.favorite import Favorite
from app.schemas.common import VehicleOut, VehicleCreate, FavoriteCreate
from sqlalchemy import func


router = APIRouter()

MOCK_RATINGS = {
    1: {"rating": 4.8, "reviews": 124},
    2: {"rating": 4.9, "reviews": 87},
    3: {"rating": 4.7, "reviews": 56},
    4: {"rating": 4.6, "reviews": 203},
    5: {"rating": 4.5, "reviews": 98},
    6: {"rating": 4.8, "reviews": 142},
}


@router.get("", response_model=list[dict])
def list_vehicles(db: Session = Depends(get_db)) -> list[dict]:
    """List all active vehicles"""
    vehicles = db.query(Vehicle).filter(Vehicle.status == "active").all()
    
    result = []
    for vehicle in vehicles:
        vehicle_dict = {
            "id": vehicle.id,
            "title": vehicle.title,
            "category": vehicle.category,
            "city": vehicle.city,
            "state": vehicle.state,
            "seats": vehicle.seats,
            "transmission": vehicle.transmission,
            "fuel_type": vehicle.fuel_type,
            "price_per_day": vehicle.price_per_day,
            "image_url": vehicle.image_url,
            "rating": MOCK_RATINGS.get(vehicle.id, {}).get("rating", 4.5),
            "reviews": MOCK_RATINGS.get(vehicle.id, {}).get("reviews", 50),
        }
        result.append(vehicle_dict)
    
    return result


@router.get("/favorites", response_model=list[dict])
def get_favorites(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[dict]:
    """Get user's favorite vehicles"""
    favorites = db.query(Vehicle).join(
        Favorite, Vehicle.id == Favorite.vehicle_id
    ).filter(Favorite.user_id == current_user.id).all()

    result = []
    for vehicle in favorites:
        vehicle_dict = {
            "id": vehicle.id,
            "title": vehicle.title,
            "category": vehicle.category,
            "city": vehicle.city,
            "state": vehicle.state,
            "seats": vehicle.seats,
            "transmission": vehicle.transmission,
            "fuel_type": vehicle.fuel_type,
            "price_per_day": vehicle.price_per_day,
            "image_url": vehicle.image_url,
            "rating": MOCK_RATINGS.get(vehicle.id, {}).get("rating", 4.5),
            "reviews": MOCK_RATINGS.get(vehicle.id, {}).get("reviews", 50),
        }
        result.append(vehicle_dict)

    return result


@router.get("/{vehicle_id}", response_model=dict)
def get_vehicle(vehicle_id: int, db: Session = Depends(get_db)) -> dict:
    """Get a specific vehicle by ID"""
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    
    if not vehicle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehicle not found",
        )
    
    return {
        "id": vehicle.id,
        "title": vehicle.title,
        "category": vehicle.category,
        "city": vehicle.city,
        "state": vehicle.state,
        "seats": vehicle.seats,
        "transmission": vehicle.transmission,
        "fuel_type": vehicle.fuel_type,
        "price_per_day": vehicle.price_per_day,
        "image_url": vehicle.image_url,
        "rating": MOCK_RATINGS.get(vehicle.id, {}).get("rating", 4.5),
        "reviews": MOCK_RATINGS.get(vehicle.id, {}).get("reviews", 50),
    }


@router.post("", response_model=dict)
def create_vehicle(
    payload: VehicleCreate,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    """Create a new vehicle listing"""
    vehicle = Vehicle(
        owner_id=current_user.id,
        title=payload.title,
        category=payload.category,
        city=payload.city,
        state=payload.state,
        seats=payload.seats,
        transmission=payload.transmission,
        fuel_type=payload.fuel_type,
        price_per_day=payload.price_per_day,
        image_url=payload.image_url,
        status="active",
    )
    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)
    
    return {
        "id": vehicle.id,
        "title": vehicle.title,
        "message": "Vehicle created successfully",
    }


@router.post("/{vehicle_id}/favorite", response_model=dict)
def add_favorite(
    vehicle_id: int,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    """Add vehicle to favorites"""
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehicle not found",
        )
    
    existing = db.query(Favorite).filter(
        (Favorite.user_id == current_user.id) & (Favorite.vehicle_id == vehicle_id)
    ).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Vehicle already in favorites",
        )
    
    favorite = Favorite(user_id=current_user.id, vehicle_id=vehicle_id)
    db.add(favorite)
    db.commit()
    
    return {"message": "Vehicle added to favorites"}


@router.delete("/{vehicle_id}/favorite", response_model=dict)
def remove_favorite(
    vehicle_id: int,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    """Remove vehicle from favorites"""
    favorite = db.query(Favorite).filter(
        (Favorite.user_id == current_user.id) & (Favorite.vehicle_id == vehicle_id)
    ).first()
    
    if not favorite:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Favorite not found",
        )
    
    db.delete(favorite)
    db.commit()
    
    return {"message": "Vehicle removed from favorites"}


