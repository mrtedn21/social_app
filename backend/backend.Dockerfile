FROM python:3.10-alpine
ENV PYTHONUNBUFFERED 1
ENV POETRY_VIRTUALENVS_CREATE=false
ENV PATH="${PATH}:/root/.poetry/bin:/root/.cargo/bin"
EXPOSE 8000/tcp
WORKDIR /app/
RUN apk add --no-cache \
    openssl `# для установки зависимостей из git` \
    libpq `# для psycopg2` \
    libjpeg-turbo zlib libffi cairo libwebp `# для pillow`
COPY poetry.lock pyproject.toml ./
RUN pip install --no-cache-dir cryptography==38.0.4
RUN apk add --no-cache --virtual build-deps \
    vim \
    curl git `# для установки poetry` \
    make gcc g++ `# для сборки пакетов` \
    postgresql-dev `# для psycopg2` \
    libjpeg-turbo-dev zlib-dev libffi-dev cairo-dev libwebp-dev `# для pillow`
RUN curl --proto '=https' --tlsv1.3 https://sh.rustup.rs -sSf | sh -s -- -y
RUN pip3 install poetry==1.1.6 \
    && poetry install --no-root --no-interaction --no-ansi
COPY ./ ./
WORKDIR backend/
#TODO return migrate running