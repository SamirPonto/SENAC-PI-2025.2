from functools import lru_cache
from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    APP_HOST: str = "0.0.0.0"
    APP_PORT: int = 8000
    DEBUG: bool = False

    class Config:
        env_file = ".env"
        case_sensitive = True

@lru_cache
def get_settings() -> Settings:
    return Settings()
