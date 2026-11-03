"""Тестовая обвязка: миграции на отдельной тестовой БД + чистые таблицы.

Безопасность: DATABASE_URL переопределяется ЖЁСТКО, чтобы
pytest ни при каких обстоятельствах не трогал dev-базу или сервер:
тесты всегда идут в flottiee_test.
"""

import asyncio
import os
from collections.abc import AsyncIterator
from pathlib import Path

os.environ["DATABASE_URL"] = "postgresql+asyncpg://flottiee@localhost:5432/flottiee_test"

from alembic.config import Config
from httpx import ASGITransport, AsyncClient
from pytest import fixture
from sqlalchemy import text

from alembic import command
from app.core.db import engine

BACKEND_DIR = Path(__file__).resolve().parents[1]

TEST_DB = "postgresql+asyncpg://flottiee@localhost:5432/flottiee_test"
TEST_EMAIL = "user@test.dev"
TEST_PASSWORD = "correct-horse-batt"


@fixture(scope="session", autouse=True)
def migrations() -> None:
    """Схема тестовой БД доводится до head один раз на сессию."""
    cfg = Config(str(BACKEND_DIR / "alembic.ini"))
    cfg.script_location = str(BACKEND_DIR / "alembic")
    command.upgrade(cfg, "head")
    # ВАЖНО: alembic поднимает свой event loop, его соединения оседают в пуле
    # engine из другого loop и роняют тесты (future attached...). Сбрасываем.
    asyncio.run(engine.dispose())


@fixture(autouse=True)
async def clean_tables(migrations) -> AsyncIterator[None]:
    """Каждый тест начинается и заканчивается с пустыми таблицами."""
    await _truncate()
    yield
    await _truncate()


async def _truncate() -> None:
    async with engine.begin() as conn:
        await conn.execute(text("TRUNCATE users, schedule_events"))


@fixture
async def client() -> AsyncIterator[AsyncClient]:
    """HTTP-клиент к приложению in-process (через ASGI), без сети.

    Cookies сохраняются между запросами — как у браузера.
    """
    from app.main import app

    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        yield ac


@fixture
async def auth_client(client: AsyncClient) -> AsyncClient:
    """Клиент уже-зарегистрированного пользователя (зарегистрирован = вошёл)."""
    r = await client.post(
        "/auth/register",
        json={"email": TEST_EMAIL, "password": TEST_PASSWORD},
    )
    assert r.status_code == 201, r.text
    return client
