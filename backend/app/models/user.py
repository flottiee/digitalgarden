"""Пользователь системы: тот, кто регистрируется и управляет своим расписанием."""

import uuid
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.db import Base

if TYPE_CHECKING:
    from app.models.schedule_event import ScheduleEvent
    from app.models.todo import Todo


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,  # UUID генерирует приложение, не СУБД
    )
    # email — «логин» этой системы, повториться не может
    email: Mapped[str] = mapped_column(String(255), unique=True)
    # хранится ТОЛЬКО bcrypt-хэш, сам пароль им не хранится
    password_hash: Mapped[str] = mapped_column(String(255))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    # связь: у пользователя список его событий.
    # cascade: удаление пользователя каскадно удалит его события
    events: Mapped[list["ScheduleEvent"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
    )
    todos: Mapped[list["Todo"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
    )
