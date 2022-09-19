# syntax=docker/dockerfile:1

FROM python:3.10-slim-buster
WORKDIR /app

COPY poetry.lock poetry.lock
COPY pyproject.toml pyproject.toml

RUN python -m pip install --upgrade pip
RUN python -m pip install --user poetry

RUN apt-get update
RUN apt-get install python3-dev libpq-dev -y

ENV PATH="${PATH}:/root/.local/bin"
RUN poetry config virtualenvs.create false
RUN poetry install --no-root --no-interaction --no-ansi

COPY . ./backend
CMD ["python", "backend/manage.py", "migrate_and_run"]
