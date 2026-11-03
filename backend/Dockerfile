# Образ backend. python:3.12-slim — минимальный официальный образ
FROM python:3.12-slim

WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# 1) зависимости отдельным слоем: при изменении кода кэш не пересобирает их
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# 2) код приложения и миграции
COPY app/ ./app/
COPY alembic/ ./alembic/
COPY alembic.ini ./

# 3) не-root пользователь: даже взломанный процесс не ломает владельца образа
RUN useradd --create-home app && chown -R app /app
USER app

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
