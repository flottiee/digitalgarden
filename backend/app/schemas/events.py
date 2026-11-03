"""Pydantic-схемы расписания: то, что принимает и отдаёт API."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, model_validator


class EventCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: str | None = Field(default=None, max_length=5000)
    # ISO 8601: "2026-11-05T14:30:00+03:00".Moment обязателен
    starts_at: datetime
    ends_at: datetime | None = None

    @model_validator(mode="after")
    def ends_after_starts(self) -> "EventCreate":
        if self.ends_at is not None and self.ends_at <= self.starts_at:
            raise ValueError("ends_at должен быть позже starts_at")
        return self


class EventUpdate(BaseModel):
    """Частичное обновление: все поля опциональны, PATCH меняет только пришедшие."""

    title: str | None = Field(default=None, min_length=1, max_length=200)
    description: str | None = Field(default=None, max_length=5000)
    starts_at: datetime | None = None
    ends_at: datetime | None = None

    @model_validator(mode="after")
    def _pair_valid(self) -> "EventUpdate":
        # проверяем только если в запросе пришли ОБА поля
        if self.starts_at is not None and self.ends_at is not None and self.ends_at <= self.starts_at:
            raise ValueError("ends_at должен быть позже starts_at")
        return self


class EventOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    title: str
    description: str | None
    starts_at: datetime
    ends_at: datetime | None
    created_at: datetime
    updated_at: datetime
