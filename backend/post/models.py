from ckeditor.fields import RichTextField
from django.db import models

from person.models import Person


class Post(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='posts')
    date_time = models.DateTimeField(auto_now_add=True)
    text = RichTextField()
    liked_by = models.ManyToManyField(Person, related_name='liked_posts', blank=True)

    @property
    def likes_count(self) -> int:
        return self.liked_by.all().count()
