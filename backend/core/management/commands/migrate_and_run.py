from django.core.management import execute_from_command_line
from django.core.management.base import BaseCommand
from django.db import connections
from django.db.utils import OperationalError


def is_connected():
    db_conn = connections['default']
    try:
        db_conn.cursor()
    except OperationalError:
        return False
    else:
        return True


def migrate():
    execute_from_command_line(('manage.py', 'migrate'))


def run_server():
    execute_from_command_line(('manage.py', 'runserver', '0:8000'))


class Command(BaseCommand):
    help = 'Check connection to db and in case, all ok - make migrate'

    def handle(self, *args, **options):
        while True:
            if is_connected():
                migrate()
                run_server()
                return
