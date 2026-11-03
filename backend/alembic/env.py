"""Alembic environment для асинхронного движка.

Идея: миграции работают с той же конфигурацией, что и приложение
(strka подключения из backend/.env), и с тем же metadata моделей.
"""

import asyncio
from logging.config import fileConfig

from alembic import context

import app.models  # noqa: F401  — импорт регистрирует модели в Base.metadata
from app.core.config import get_settings
from app.core.db import Base, engine

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# то, что Alembic сравнивает с реальной схемой БД при autogenerate
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Offline-режим: пишем SQL-скрипт миграции без подключения к БД."""
    context.configure(
        dialect_name="postgresql",
        target_metadata=target_metadata,
        literal_binds=True,
    )
    with context.begin_transaction():
        context.run_migrations()


def _sync_run(connection) -> None:
    context.configure(
        connection=connection,
        target_metadata=target_metadata,
    )
    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online() -> None:
    """Online-режим: выполняем миграции через async-движок приложения.

    asyncpg — асинхронный драйвер, а ядро Alembic синхронное, поэтому
    соединение «оборачивается» через conn.run_sync.
    """
    async with engine.connect() as connection:
        await connection.run_sync(_sync_run)


if context.is_offline_mode():
    run_migrations_offline()
else:
    asyncio.run(run_migrations_online())
