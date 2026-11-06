"""Событие расписания конкретного пользователя."""

import uuid
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, ForeignKey, Index, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.db import Base

if TYPE_CHECKING:
    from app.models.user import User


class ScheduleEvent(Base):
    __tablename__ = "schedule_events"

    # основной запрос приложения: «все события пользователя X по времени».
    # составной индекс покрывает и фильтр по user_id, и сортировку по starts_at
    __table_args__ = (
        Index("ix_schedule_events_user_starts_at", "user_id", "starts_at"),
    )

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        # отдельный индекс не нужен: покрывается составным из __table_args__
    )
    title: Mapped[str] = mapped_column(String(200))
    description: Mapped[str | None] = mapped_column(Text, default=None)

    # timezone=True: PostgreSQL хранит момент во времени UTC (timestamptz),
    # браузер клиента рисует его в своей таймзоне
    starts_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    ends_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )

    user: Mapped["User"] = relationship(back_populates="events")
