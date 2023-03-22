from uuid import uuid1

from core.models import MultiImageMeta, null_and_blank
from django.db import models
from django.db.utils import IntegrityError
from person.models import Person
from slugify import slugify


class GroupTheme(models.Model):
    name = models.CharField(max_length=64)
    slug = models.SlugField(max_length=64)

    def __str__(self):
        return f'Group theme: {self.name}'


class Group(models.Model, metaclass=MultiImageMeta):
    avatar = models.ImageField(upload_to='group/avatar')
    name = models.CharField(max_length=64)
    short_description = models.CharField(max_length=256, **null_and_blank)
    long_description = models.TextField(**null_and_blank)
    slug = models.SlugField(max_length=64, unique=True, **null_and_blank)
    theme = models.ForeignKey(GroupTheme, on_delete=models.CASCADE)
    followers = models.ManyToManyField(Person, blank=True)
    followers_count = models.PositiveIntegerField(default=0, help_text='Auto calculated field')
    created_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'Group: {self.name}'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        try:
            return super().save(*args, **kwargs)
        except IntegrityError:
            self.slug = str(uuid1())
            return super().save(*args, **kwargs)
