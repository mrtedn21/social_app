FROM python:3.11-alpine
ENV PYTHONUNBUFFERED 1
ENV POETRY_VIRTUALENVS_CREATE=false
ENV PATH="${PATH}:/root/.poetry/bin"
EXPOSE 8000/tcp
RUN mkdir /app
WORKDIR /app/
RUN apk add --no-cache \
    openssl `# для установки зависимостей из git` \
    libpq `# для psycopg2` \
    libjpeg-turbo zlib libffi cairo libwebp `# для pillow`
COPY poetry.lock pyproject.toml /app/
RUN apk add --no-cache --virtual build-deps \
    vim \
    curl git `# для установки poetry` \
    make gcc g++ `# для сборки пакетов` \
    postgresql-dev `# для psycopg2` \
    libjpeg-turbo-dev zlib-dev libffi-dev cairo-dev libwebp-dev `# для pillow` \
    && pip install --no-cache-dir cryptography==2.1.4 \
    && pip3 install poetry==1.1.6 \
    && poetry install --no-root --no-interaction --no-ansi \
    && apk del --no-cache build-deps
COPY / /app/
CMD ["python", "backend/manage.py", "migrate_and_run"]
