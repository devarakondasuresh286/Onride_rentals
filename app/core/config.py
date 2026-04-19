from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Onride Rentals"
    # Use SQLite by default for local setup; override with MySQL DATABASE_URL in .env.
    database_url: str = "sqlite:///./onride_rentals.db"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
