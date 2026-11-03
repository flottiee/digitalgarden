"""Бизнес-правила пользователей. HTTP-детали (статусы, cookie) — не здесь."""

from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import hash_password, verify_password
from app.models.user import User
from app.schemas.auth import UserCreate


async def get_user(db: AsyncSession, user_id: UUID) -> User | None:
    return await db.get(User, user_id)


async def get_by_email(db: AsyncSession, email: str) -> User | None:
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()


async def register_user(db: AsyncSession, data: UserCreate) -> User:
    """Создаёт пользователя; уникальность email гарантирует сама БД."""
    user = User(email=data.email.lower(), password_hash=hash_password(data.password))
    db.add(user)
    try:
        await db.commit()
    except IntegrityError:
        # гонка: два запроса одновременно с одним email. pre-check не спасёт —
        # UNIQUE-контроинт БД финальный судья
        await db.rollback()
        raise HTTPException(
            status.HTTP_409_CONFLICT,
            detail="Пользователь с таким email уже существует",
        )
    # загрузить server_default-значения (created_at) в свежий объект
    await db.refresh(user)
    return user


async def authenticate(db: AsyncSession, email: str, password: str) -> User | None:
    """Проверка пары email+пароль. None — неверные данные."""
    user = await get_by_email(db, email.lower())
    if user is None or not verify_password(password, user.password_hash):
        return None
    return user
