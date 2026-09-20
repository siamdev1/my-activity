import os
from pydantic import BaseModel


class AppSettings(BaseModel):
    app_name: str = "Siam Activity Microservice"
    app_version: str = "1.0.0"
    environment: str = os.getenv("ENV", "development")
    cors_origins: list = ["http://localhost:3000", "http://localhost:5000"]
    debug: bool = os.getenv("DEBUG", "True").lower() == "true"


settings = AppSettings()
