from ckeditor.fields import RichTextField
from django.db import models
from group.models import Group
from person.models import Person


class BasePost(models.Model):
    date_time = models.DateTimeField(auto_now_add=True)
    text = RichTextField()
    # TODO make this field calculated in celery beat task for fast select
    likes_count = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ('-pk',)
        abstract = True

    def __str__(self):
        return f'Post: {self.text}'


class PersonPost(BasePost):
    liked_by = models.ManyToManyField(Person, related_name='liked_person_posts', blank=True)
    person = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='posts')


class GroupPost(BasePost):
    liked_by = models.ManyToManyField(Person, related_name='liked_group_posts', blank=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='posts')
