"""Зависимости FastAPI для авторизации."""

from typing import Annotated
from uuid import UUID

import jwt
from fastapi import Depends, HTTPException, Security, status
from fastapi.security import APIKeyCookie
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.core.db import get_db
from app.core.security import decode_token
from app.models.user import User
from app.services.users import get_user

# cookie может отсутствовать (auto_error=False): различаем
# «нет cookie» и «битый токен» — разные 401
_cookie = APIKeyCookie(name=get_settings().cookie_name, auto_error=False)

_401_HEADERS = {"WWW-Authenticate": "Bearer"}


async def get_current_user(
    token: Annotated[str | None, Security(_cookie)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> User:
    """Зависимость «кто это».

    Любая проблема (нет cookie / битый токен / пользователь удалён) — 401.
    Router'ы просто объявляют user: CurrentUser и получают готовый объект.
    """
    if token is None:
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            detail="Не авторизован",
            headers=_401_HEADERS,
        )
    user_id: UUID
    try:
        user_id = decode_token(token)
    except (jwt.PyJWTError, ValueError):
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            detail="Сессия недействительна",
            headers=_401_HEADERS,
        )
    user = await get_user(db, user_id)
    if user is None:  # пользователь был удалён, токен выжил
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            detail="Сессия недействительна",
            headers=_401_HEADERS,
        )
    return user


CurrentUser = Annotated[User, Depends(get_current_user)]
