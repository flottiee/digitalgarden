"""HTTP-слой авторизации. Маршруты вызывают services и управляют cookie."""

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_db
from app.core.deps import CurrentUser
from app.core.security import clear_auth_cookie, create_token, set_auth_cookie
from app.models.user import User
from app.schemas.auth import LoginIn, UserCreate, UserOut
from app.services.users import authenticate, get_by_email, register_user

router = APIRouter(prefix="/auth", tags=["auth"])

_DB = Annotated[AsyncSession, Depends(get_db)]


@router.post("/register", status_code=201, response_model=UserOut)
async def register(
    data: UserCreate,
    db: _DB,
    response: Response,
) -> User:
    """Регистрация = создание пользователя + немедленный вход (cookie)."""
    duplicate = await get_by_email(db, data.email.lower())
    if duplicate is not None:
        raise HTTPException(
            status.HTTP_409_CONFLICT,
            detail="Пользователь с таким email уже существует",
        )
    user = await register_user(db, data)
    set_auth_cookie(response, create_token(user.id))
    return user


@router.post("/login", response_model=UserOut)
async def login(
    data: LoginIn,
    db: _DB,
    response: Response,
) -> User:
    """Вход: пара email+пароль -> httpOnly cookie с JWT."""
    user = await authenticate(db, data.email.lower(), data.password)
    if user is None:
        # Подель «неверный email» или «неверный пароль» — одинаковый ответ,
        # чтобы не подсказывать переборщикам, что именно угадано
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            detail="Неверный email или пароль",
        )
    set_auth_cookie(response, create_token(user.id))
    return user


@router.post("/logout", status_code=204)
async def logout(response: Response) -> None:
    """Выход = удаление cookie. Сами JWT stateless: перечитать их нельзя."""
    clear_auth_cookie(response)


@router.get("/me", response_model=UserOut)
async def me(user: CurrentUser) -> User:
    """Кто я: работает только с валидной cookie, иначе 401."""
    return user
