"""Импорт всех моделей, чтобы Alembic видел их в Base.metadata."""

from app.models.schedule_event import ScheduleEvent
from app.models.user import User

__all__ = ["User", "ScheduleEvent"]
