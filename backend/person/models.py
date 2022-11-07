from uuid import uuid4

from django.contrib.auth.models import User
from django.db import models

from core.models import MultiImageMeta
from photo.models import Photo


class Country(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return f'Country: {self.name}'


class City(models.Model):
    name = models.CharField(max_length=64)
    country = models.ForeignKey(Country, on_delete=models.PROTECT, related_name='cities')

    def __str__(self):
        return f'City: {self.name}, Country: {self.country.name}'


class Gender(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return f'Gender: {self.name}'


class Language(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return f'Language: {self.name}'


class Person(models.Model, metaclass=MultiImageMeta):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    friends = models.ManyToManyField('self', blank=True, symmetrical=True)

    avatar = models.ImageField(upload_to='person_avatars', null=True, blank=True)
    avatar.crop_thumbnail = True
    photos = models.ManyToManyField(Photo, blank=True, related_name='persons')

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
