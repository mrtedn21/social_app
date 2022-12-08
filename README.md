```bash
git clone git@github.com:mrtedn21/social_app.git
```
Then copy .env file to root of project and to backend/core/ directory
```bash
docker-compose build
docker-compose up -d
cd backend
poetry shell
poetry install --no-root
poetry run python manage.py runserver
```
