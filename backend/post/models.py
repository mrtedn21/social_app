from ckeditor.fields import RichTextField
from django.db import models

from person.models import Person


class Post(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    date_time = models.DateTimeField(auto_now_add=True)
    text = RichTextField()
    liked_by = models.ManyToManyField(Person, related_name='liked_posts', blank=True)
