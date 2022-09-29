from uuid import uuid4

from django.contrib.auth.models import User
from django.db import models


class Person(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    friends = models.ManyToManyField('self', blank=True, symmetrical=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birth_date = models.DateField()
    submit_email = models.BooleanField(default=False)
    uuid = models.UUIDField(default=uuid4)

    def __str__(self):
        return f'Person: {self.first_name} {self.last_name}'
