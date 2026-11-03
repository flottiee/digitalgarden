"""Конфигурация приложения.

Принцип: код не знает паролей и адресов — всё приходит из окружения
(pydantic-settings читает os.environ и backend/.env). Так один и тот же
код работает локально, в тестах и на сервере без изменений.
"""

from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # env_file — путь относительно рабочей директории запуска (обычно backend/)
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",  # лишние переменные в .env не роняют старт
    )

    app_name: str = "flottiee backend"
    environment: str = "dev"  # dev | prod

    # Без строки подключения стартовать нельзя (pydantic поднимет ошибку) —
    # это специально: молча работающий без БД сервис вреднее падающего.
    database_url: str

    # JWT: секрет подписи и срок жизни access-токена (по умолчанию 7 дней)
    jwt_secret: str = "dev-only-not-a-secret"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 60 * 24 * 7

    # HttpOnly-cookie, в которую FastAPI кладёт JWT
    cookie_name: str = "access_token"
    # Secure=true разрешает передавать cookie только по https (прод, Tunnel)
    cookie_secure: bool = False

    # CORS: какие origin-ы фронтенда могут вызывать API из браузера
    cors_origins: list[str] = Field(
        default_factory=lambda: ["http://localhost:3000"],
    )


@lru_cache
def get_settings() -> Settings:
    # lru_cache: .env читается один раз, все модули получают один объект
    return Settings()
