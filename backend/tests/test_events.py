"""Тесты расписания: CRUD, изоляция владельцев, фильтры, валидация."""

from datetime import UTC, datetime, timedelta
from typing import Any
from uuid import UUID

from httpx import ASGITransport, AsyncClient

from app.main import app

TEST_EMAIL = "user@test.dev"
TEST_PASSWORD = "correct-horse-batt"


def _event(email_time: int) -> dict[str, Any]:
    start = datetime(2026, 11, 1, 14, 0, tzinfo=UTC) + timedelta(days=email_time)
    return {
        "title": f"Событие {email_time}",
        "starts_at": start.isoformat(),
        "ends_at": (start + timedelta(hours=1)).isoformat(),
    }


async def _create(client: AsyncClient, payload: dict[str, Any]) -> dict[str, Any]:
    r = await client.post("/api/events", json=payload)
    assert r.status_code == 201, r.text
    return r.json()


async def test_crud_cycle(auth_client: AsyncClient) -> None:
    created = await _create(auth_client, _event(0))
    event_id = UUID(created["id"])

    assert created["title"] == "Событие 0"
    # созданный объект содержит служебные метки и не содержит user_id (не надо наружу)
    assert "created_at" in created and "updated_at" in created
    assert "user_id" not in created

    listed = (await auth_client.get("/api/events")).json()
    assert [item["id"] for item in listed] == [created["id"]]

    got = await auth_client.get(f"/api/events/{event_id}")
    assert got.status_code == 200
    assert got.json()["title"] == "Событие 0"

    patched = await auth_client.patch(
        f"/api/events/{event_id}",
        json={"title": "Переименовано"},
    )
    assert patched.status_code == 200
    body = patched.json()
    assert body["title"] == "Переименовано"
    # PATCH меняет только присланное поле: время не трогается
    assert body["starts_at"] == created["starts_at"]

    deleted = await auth_client.delete(f"/api/events/{event_id}")
    assert deleted.status_code == 204
    assert (await auth_client.get("/api/events")).json() == []
    assert (await auth_client.get(f"/api/events/{event_id}")).status_code == 404


async def test_ends_before_starts_rejected(auth_client: AsyncClient) -> None:
    payload = {
        "title": "Странное",
        "starts_at": "2026-11-05T16:00:00+03:00",
        "ends_at": "2026-11-05T14:00:00+03:00",
    }
    r = await auth_client.post("/api/events", json=payload)
    assert r.status_code == 422


async def test_events_require_auth(client: AsyncClient) -> None:
    for method, kwargs in (("get", {}), ("post", {"json": _event(0)})):
        r = await getattr(client, method)("/api/events", **kwargs)
        assert r.status_code == 401, f"{method}: {r.status_code}"


async def test_ownership_isolation(client: AsyncClient) -> None:
    """Пользователь B не видит и не трогает события пользователя A."""
    # A: регистрируется и создаёт событие
    r = await client.post("/auth/register", json={"email": TEST_EMAIL, "password": TEST_PASSWORD})
    assert r.status_code == 201
    foreign = await _create(client, _event(0))

    # B: отдельный клиент (и свой cookie-jar) поверх того же приложения
    other = AsyncClient(transport=ASGITransport(app=app), base_url="http://test")
    try:
        rb = await other.post(
            "/auth/register",
            json={"email": "other@test.dev", "password": TEST_PASSWORD},
        )
        assert rb.status_code == 201

        assert (await other.get("/api/events")).json() == []
        assert (await other.get(f"/api/events/{foreign['id']}")).status_code == 404
        assert (await other.delete(f"/api/events/{foreign['id']}")).status_code == 404
    finally:
        await other.aclose()

    # у A ничто не пострадало
    assert (await client.get("/api/events")).json() == [foreign]


async def test_time_filters(auth_client: AsyncClient) -> None:
    """Фильтры ?from_at= (включительно) и ?to= (исключительно) по starts_at."""
    for i in range(3):
        await _create(auth_client, _event(i * 7))  # 1, 8, 15 ноября

    mid = datetime(2026, 11, 4, tzinfo=UTC).isoformat()
    late = datetime(2026, 11, 10, tzinfo=UTC).isoformat()

    # с 4 ноября: 8-е и 15-е (1-е не попадает)
    r = (await auth_client.get("/api/events", params={"from_at": mid})).json()
    assert [e["title"] for e in r] == ["Событие 7", "Событие 14"]

    # до 10 ноября (исключая): 1-е и 8-е
    r = (await auth_client.get("/api/events", params={"to": late})).json()
    assert [e["title"] for e in r] == ["Событие 0", "Событие 7"]

    # граница до 4 ноября: только 1-е
    r = (await auth_client.get("/api/events", params={"to": mid})).json()
    assert [e["title"] for e in r] == ["Событие 0"]
