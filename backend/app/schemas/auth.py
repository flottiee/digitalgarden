"""Pydantic-схемы: контракт входящих/исходящих данных auth."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class UserCreate(BaseModel):
    email: EmailStr
    # 8..72 СИМВОЛОВ; дополнительно проверяем байты: bcrypt ест максимум 72
    password: str = Field(min_length=8, max_length=72)

    @field_validator("password")
    @classmethod
    def password_byte_length(cls, value: str) -> str:
        # строки из не-ASCII символов: 72 символа ≫ 72 байт
        if len(value.encode("utf-8")) > 72:
            raise ValueError("Пароль не должен превышать 72 байта")
        return value


class LoginIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=200)


class UserOut(BaseModel):
    """Ответ API про пользователя — БЕЗ password_hash, наружу хэши не уходим."""

    model_config = ConfigDict(from_attributes=True)  # конвертация из ORM-объекта

    id: UUID
    email: str
    created_at: datetime
