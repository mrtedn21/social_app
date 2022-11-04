from django.db import models

from core.models import MultiImageMeta


class Photo(models.Model, metaclass=MultiImageMeta):
    image = models.ImageField(upload_to='photos')
    description = models.TextField(blank=True, null=True)
    date_time = models.DateTimeField(auto_now_add=True)
