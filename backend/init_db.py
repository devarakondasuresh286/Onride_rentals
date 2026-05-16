from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import hashlib

from app.core.config import settings
from app.models.base import Base
from app.models.user import User
from app.models.vehicle import Vehicle
from app.models.booking import Booking
from app.models.payment import Payment
from app.models.notification import Notification
from app.models.review import Review
from app.models.favorite import Favorite
from datetime import date, datetime


def simple_hash(password: str) -> str:
    """Simple hash for demo purposes (NOT for production)"""
    return hashlib.sha256(password.encode()).hexdigest()


def init_db():
    """Initialize database with tables and sample data"""
    # Create engine with appropriate settings
    if settings.DATABASE_TYPE == "sqlite":
        engine = create_engine(
            settings.DATABASE_URL,
            connect_args={"check_same_thread": False}
        )
    else:
        engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)
    
    Base.metadata.create_all(bind=engine)
    
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    
    try:
        if db.query(User).first():
            print("Database already initialized")
            return
        
        user1 = User(
            first_name="John",
            last_name="Doe",
            email="john@example.com",
            password_hash=simple_hash("password123"),
            role="customer",
        )
        user2 = User(
            first_name="Jane",
            last_name="Smith",
            email="jane@example.com",
            password_hash=simple_hash("password123"),
            role="renter",
        )
        user3 = User(
            first_name="Admin",
            last_name="User",
            email="admin@example.com",
            password_hash=simple_hash("admin123"),
            role="admin",
        )
        
        db.add(user1)
        db.add(user2)
        db.add(user3)
        db.commit()

        vehicles_data = [
            {
                "owner_id": user2.id,
                "title": "2024 Premium Sedan",
                "category": "Sedan",
                "city": "San Francisco",
                "state": "CA",
                "seats": 5,
                "transmission": "Automatic",
                "fuel_type": "Gasoline",
                "price_per_day": 65,
                "image_url": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
            },
            {
                "owner_id": user2.id,
                "title": "Luxury SUV Crossover",
                "category": "SUV",
                "city": "Los Angeles",
                "state": "CA",
                "seats": 7,
                "transmission": "Automatic",
                "fuel_type": "Hybrid",
                "price_per_day": 89,
                "image_url": "https://images.unsplash.com/photo-1494976688757-8fe9b7b8dc84?auto=format&fit=crop&w=1200&q=80",
            },
            {
                "owner_id": user2.id,
                "title": "Sports Convertible",
                "category": "Sports",
                "city": "Miami",
                "state": "FL",
                "seats": 2,
                "transmission": "Manual",
                "fuel_type": "Gasoline",
                "price_per_day": 120,
                "image_url": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
            },
            {
                "owner_id": user2.id,
                "title": "Electric City Hatchback",
                "category": "Electric",
                "city": "Portland",
                "state": "OR",
                "seats": 4,
                "transmission": "Automatic",
                "fuel_type": "Electric",
                "price_per_day": 45,
                "image_url": "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1200&q=80",
            },
            {
                "owner_id": user2.id,
                "title": "Rugged Pickup Truck",
                "category": "Truck",
                "city": "Denver",
                "state": "CO",
                "seats": 5,
                "transmission": "Automatic",
                "fuel_type": "Diesel",
                "price_per_day": 75,
                "image_url": "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80",
            },
            {
                "owner_id": user2.id,
                "title": "Family SUV Premium",
                "category": "SUV",
                "city": "Seattle",
                "state": "WA",
                "seats": 7,
                "transmission": "Automatic",
                "fuel_type": "Gasoline",
                "price_per_day": 95,
                "image_url": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
            },
        ]
        
        vehicles = []
        for vehicle_data in vehicles_data:
            vehicle = Vehicle(**vehicle_data, status="active")
            vehicles.append(vehicle)
            db.add(vehicle)
        
        db.commit()
        
        booking1 = Booking(
            user_id=user1.id,
            vehicle_id=vehicles[0].id,
            start_date=date(2026, 4, 10),
            end_date=date(2026, 4, 13),
            total_price=210,
            status="upcoming",
            payment_status="completed",
        )
        
        db.add(booking1)
        db.commit()

        payment1 = Payment(
            booking_id=booking1.id,
            amount=210,
            method="card",
            status="completed",
        )
        
        db.add(payment1)
        db.commit()
        
        print("Database initialized successfully with sample data!")
        
    except Exception as e:
        print(f"Error initializing database: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    init_db()
