from fastapi import FastAPI

from app.core.database import Base, engine
from app.routes import api_router

app = FastAPI(title="Onride Rentals API", version="1.0.0")


@app.on_event("startup")
def on_startup() -> None:
    Base.metadata.create_all(bind=engine)


app.include_router(api_router)


@app.get("/")
def health_check() -> dict[str, str]:
    return {"message": "Onride Rentals API running"}
