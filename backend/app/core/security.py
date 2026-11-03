"""Аутентификационные примитивы: bcrypt для паролей, JWT для сессий."""

from datetime import UTC, datetime, timedelta
from uuid import UUID

import bcrypt
import jwt
from fastapi import Response

from app.core.config import get_settings

# --- пароли ---------------------------------------------------------------

def hash_password(plain: str) -> str:
    """bcrypt хэш.

    Соль генерируется автоматически и хранится ВНУТРИ самого хэша,
    отдельного поля для неё не нужно.
    """
    return bcrypt.hashpw(plain.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    # битый/чужой формат хэша — это «неверный пароль», а не 500
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except ValueError:
        return False


# --- JWT ------------------------------------------------------------------

def create_token(user_id: UUID) -> str:
    """Подписанный JWT: предмет (sub) — id пользователя."""
    s = get_settings()
    now = datetime.now(UTC)
    payload = {
        "sub": str(user_id),
        "iat": now,
        "exp": now + timedelta(minutes=s.jwt_expire_minutes),
    }
    return jwt.encode(payload, s.jwt_secret, algorithm=s.jwt_algorithm)


def decode_token(token: str) -> UUID:
    """Извлекает user_id из токена.

    Невалидная подпись, истечение срока и прочие проблемы токена —
    jwt.PyJWTError (зависимость ловит и превращает в 401).
    """
    s = get_settings()
    payload = jwt.decode(
        token,
        s.jwt_secret,
        algorithms=[s.jwt_algorithm],  # ЯВНО фиксируем алгоритм (protection)
    )
    return UUID(payload["sub"])


# --- httpOnly cookie --------------------------------------------------------

def set_auth_cookie(response: Response, token: str) -> None:
    """Кладём JWT в cookie.

    httponly: JS не может прочитать cookie (защита от кражи из XSS).
    samesite=lax: api.flottiee.bond и flottiee.bond — «один сайт»
    (общее flottiee.bond), fetch с credentials проходит.
    secure: на проде True — cookie уходит только по https.
    """
    s = get_settings()
    response.set_cookie(
        key=s.cookie_name,
        value=token,
        httponly=True,
        samesite="lax",
        secure=s.cookie_secure,
        max_age=s.jwt_expire_minutes * 60,
        path="/",
    )


def clear_auth_cookie(response: Response) -> None:
    """«Выход» = expiration cookie, серверный токен отозвать нельзя (см. todo)."""
    s = get_settings()
    response.delete_cookie(s.cookie_name, path="/")
