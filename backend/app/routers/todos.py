"""HTTP-маршруты списка задач."""

import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_db
from app.core.deps import CurrentUser
from app.schemas.todos import TodoCreate, TodoOut, TodoUpdate
from app.services import todos as todos_service

router = APIRouter(prefix="/api/todos", tags=["todos"])
_DB = Annotated[AsyncSession, Depends(get_db)]


@router.get("", response_model=list[TodoOut])
async def list_todos(user: CurrentUser, db: _DB) -> list:
    return await todos_service.list_todos(db, user)


@router.post("", status_code=status.HTTP_201_CREATED, response_model=TodoOut)
async def create_todo(data: TodoCreate, user: CurrentUser, db: _DB) -> object:
    return await todos_service.create_todo(db, user, data)


@router.patch("/{todo_id}", response_model=TodoOut)
async def update_todo(todo_id: uuid.UUID, data: TodoUpdate, user: CurrentUser, db: _DB) -> object:
    return await todos_service.update_todo(db, todo_id, user, data)


@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(todo_id: uuid.UUID, user: CurrentUser, db: _DB, response: Response) -> None:
    await todos_service.delete_todo(db, todo_id, user)
