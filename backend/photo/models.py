from django.db import models

from core.models import MultiImageMeta, null_and_blank
from group.models import Group
from person.models import Person


class PersonPhoto(models.Model, metaclass=MultiImageMeta):
    person = models.ForeignKey(
        Person, on_delete=models.CASCADE, related_name='photos', **null_and_blank
    )
    image = models.ImageField(upload_to='photos')
    description = models.TextField(blank=True, null=True)
    date_time = models.DateTimeField(auto_now_add=True)


class GroupPhoto(models.Model, metaclass=MultiImageMeta):
    group = models.ForeignKey(
        Group, on_delete=models.CASCADE, related_name='photos', **null_and_blank
    )
    image = models.ImageField(upload_to='photos')
    description = models.TextField(blank=True, null=True)
    date_time = models.DateTimeField(auto_now_add=True)
