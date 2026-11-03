"""Служебные маршруты: живость приложения."""

from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_db

router = APIRouter(tags=["health"])


@router.get("/health")
async def health(
    db: Annotated[AsyncSession, Depends(get_db)],
) -> dict[str, str]:
    """Живость сервиса И доступность базы.

    Просто «сервер поднялся» недостаточно: выполняем SELECT 1 в реальной
    БД. Если БД недоступна — 500. Позже этот же эндпоинт станет
    healthcheck'ом контейнера api в docker-compose.
    """
    await db.execute(text("SELECT 1"))
    return {"status": "ok"}
