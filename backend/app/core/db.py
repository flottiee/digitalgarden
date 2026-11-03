"""Асинхронное подключение к PostgreSQL через SQLAlchemy 2.0."""

from collections.abc import AsyncIterator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.core.config import get_settings


class Base(DeclarativeBase):
    """Родитель всех ORM-моделей. Alembic найдёт таблицы через его metadata."""


_settings = get_settings()
engine = create_async_engine(
    _settings.database_url,
    # pool_pre_ping: перед взятием соединения из пула отправлять лёгкий
    # пинг, чтобы отбрасывать «мертвые» соединения после рестарта БД
    pool_pre_ping=True,
)

# фабрика сессий. expire_on_commit=False: после commit объекты остаются
# читаемыми без дополнительного похода в БД (удобно для возвращаемых схем)
session_factory = async_sessionmaker(engine, expire_on_commit=False)


async def get_db() -> AsyncIterator[AsyncSession]:
    """FastAPI-зависимость: сессия БД на время одного запроса.

    FastAPI вызывает get_db перед обработчиком и закрывает сессию после
    ответа, поэтому ни один запрос не держит соединение вечно.
    """
    async with session_factory() as session:
        yield session
