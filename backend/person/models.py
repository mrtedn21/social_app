from uuid import uuid4

from core.models import MultiImageMeta
from django.contrib.auth.models import User
from django.db import models
from django.db.models.functions import Concat, Lower
from dateutil.relativedelta import relativedelta
from django.utils.timezone import now


class Country(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return f'Country: {self.name}'


class City(models.Model):
    name = models.CharField(max_length=64)
    country = models.ForeignKey(Country, on_delete=models.PROTECT, related_name='cities')

    def __str__(self):
        return f'City: {self.name}'


class Gender(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return f'Gender: {self.name}'


class Language(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return f'Language: {self.name}'


person_name_annotation = Lower(
    Concat('first_name', 'last_name', 'first_name', output_field=models.CharField())
)


class Person(models.Model, metaclass=MultiImageMeta):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='person_avatars', null=True, blank=True)

    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birth_date = models.DateField()
    gender = models.ForeignKey(Gender, on_delete=models.SET_NULL, null=True)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True)
    languages = models.ManyToManyField(Language, blank=True)

    submit_email = models.BooleanField(default=False)
    uuid = models.UUIDField(default=uuid4)

    def __str__(self):
        return f'Person: {self.first_name} {self.last_name}'

    def get_age(self):
        return relativedelta(now().date(), self.birth_date).years
