from pydantic_settings import BaseSettings
from typing import List, Optional
import os

class Settings(BaseSettings):
    # Database - default to SQLite
    DATABASE_URL: str = "sqlite:///./portfolio.db"
    
    # JWT
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS - Allow all origins for portfolio
    ALLOWED_ORIGINS: List[str] = ["*"]
    
    # Environment
    ENVIRONMENT: str = "production"
    
    # Email Configuration
    EMAIL_HOST: str = os.getenv("EMAIL_HOST", "smtp.gmail.com")
    EMAIL_PORT: int = int(os.getenv("EMAIL_PORT", "587"))
    EMAIL_USER: Optional[str] = os.getenv("EMAIL_USER")
    EMAIL_PASSWORD: Optional[str] = os.getenv("EMAIL_PASSWORD")
    EMAIL_USE_TLS: bool = os.getenv("EMAIL_USE_TLS", "true").lower() == "true"
    RECEIVER_EMAIL: Optional[str] = os.getenv("RECEIVER_EMAIL", "akashpasay567@gmail.com")
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
