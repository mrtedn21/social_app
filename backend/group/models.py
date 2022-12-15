from django.db import models

from core.models import MultiImageMeta, null_and_blank


class Group(models.Model, metaclass=MultiImageMeta):
    avatar = models.ImageField(upload_to='group/avatar')
    name = models.CharField(max_length=64)
    short_description = models.CharField(max_length=256, **null_and_blank)
    long_description = models.TextField(**null_and_blank)
    slug = models.SlugField(max_length=64)
    created_date = models.DateField(auto_now_add=True)
