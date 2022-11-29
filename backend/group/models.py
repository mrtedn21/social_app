from django.db import models

from core.models import MultiImageMeta


class Group(models.Model, metaclass=MultiImageMeta):
    avatar = models.ImageField(upload_to='group/avatar')
    name = models.CharField(max_length=64)
    slug = models.SlugField(max_length=64)
    created_date = models.DateField(auto_now_add=True)
