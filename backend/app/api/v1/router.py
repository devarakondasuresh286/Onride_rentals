# router.py placeholder
from fastapi import APIRouter

from app.api.v1.routes import admin, auth, bookings, notifications, payments, vehicles


api_router = APIRouter()
# api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(vehicles.router, prefix="/vehicles", tags=["vehicles"])
# api_router.include_router(bookings.router, prefix="/bookings", tags=["bookings"])
# api_router.include_router(payments.router, prefix="/payments", tags=["payments"])
# api_router.include_router(notifications.router, prefix="/notifications", tags=["notifications"])
# api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
