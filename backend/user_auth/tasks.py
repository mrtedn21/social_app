from celery import shared_task
from django.conf import settings
from django.core.mail import send_mail


@shared_task
def send_email(subject: str, text: str) -> None:
    send_mail(
        subject,
        text,
        settings.EMAIL_HOST_USER,
        ('bezgin.sasha06@gmail.com',),
    )
