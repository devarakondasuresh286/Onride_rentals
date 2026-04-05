from fastapi import APIRouter

from app.routes.booking_routes import router as booking_router
from app.routes.payment_routes import router as payment_router
from app.routes.review_routes import router as review_router
from app.routes.user_routes import router as user_router
from app.routes.vehicle_routes import router as vehicle_router

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(user_router)
api_router.include_router(vehicle_router)
api_router.include_router(booking_router)
api_router.include_router(payment_router)
api_router.include_router(review_router)
