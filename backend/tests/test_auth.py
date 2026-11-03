"""Тесты авторизации: регистрация, вход, cookie, границы."""

from httpx import AsyncClient

TEST_EMAIL = "user@test.dev"
TEST_PASSWORD = "correct-horse-batt"


async def test_register_returns_user_without_hash(client: AsyncClient) -> None:
    r = await client.post(
        "/auth/register",
        json={"email": TEST_EMAIL, "password": TEST_PASSWORD},
    )
    assert r.status_code == 201, r.text
    body = r.json()
    assert body["email"] == TEST_EMAIL
    assert "id" in body
    # хэш пароля не должен утекать ни в один ответ API
    assert "password_hash" not in body
    assert "password" not in body


async def test_register_sets_httponly_cookie(client: AsyncClient) -> None:
    r = await client.post(
        "/auth/register",
        json={"email": TEST_EMAIL, "password": TEST_PASSWORD},
    )
    header = r.headers["set-cookie"].lower()
    assert "httponly" in header
    assert "samesite=lax" in header
    assert r.cookies.get("access_token") is not None


async def test_duplicate_email_returns_409(client: AsyncClient) -> None:
    payload = {"email": TEST_EMAIL, "password": TEST_PASSWORD}
    r1 = await client.post("/auth/register", json=payload)
    r2 = await client.post("/auth/register", json=payload)
    assert r1.status_code == 201
    assert r2.status_code == 409, r2.text


async def test_wrong_password_and_unknown_email_same_answer(client: AsyncClient) -> None:
    await client.post(
        "/auth/register",
        json={"email": TEST_EMAIL, "password": TEST_PASSWORD},
    )
    # неверный пароль у существующего и несуществующий email должны выглядеть
    # одинаково: не подсказываем переборщикам, что именно угадано
    wrong_pw = await client.post(
        "/auth/login",
        json={"email": TEST_EMAIL, "password": "totally-wrong-password-999"},
    )
    unknown = await client.post(
        "/auth/login",
        json={"email": "ghost@test.dev", "password": TEST_PASSWORD},
    )
    assert wrong_pw.status_code == unknown.status_code == 401
    assert wrong_pw.json()["detail"] == unknown.json()["detail"]


async def test_me_requires_cookie(client: AsyncClient) -> None:
    r = await client.get("/auth/me")
    assert r.status_code == 401


async def test_me_returns_current_user(auth_client: AsyncClient) -> None:
    r = await auth_client.get("/auth/me")
    assert r.status_code == 200
    assert r.json()["email"] == TEST_EMAIL
    assert "password_hash" not in r.json()


async def test_logout_clears_session(client: AsyncClient) -> None:
    await client.post(
        "/auth/register",
        json={"email": TEST_EMAIL, "password": TEST_PASSWORD},
    )
    assert (await client.post("/auth/logout")).status_code == 204
    # cookie удалена -> /me больше не авторизован
    assert (await client.get("/auth/me")).status_code == 401
