from core.models import MultiImageMeta, null_and_blank
from django.db import models
from group.models import Group
from person.models import Person


class BaseVideo(models.Model, metaclass=MultiImageMeta):
    video = models.FileField(upload_to='videos')
    preview = models.ImageField(upload_to='video_previews')
    name = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    date_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class PersonVideo(BaseVideo):
    person = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='videos')

    def __str__(self):
        return f'Person video: {self.description}'


class GroupVideo(BaseVideo):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='videos')

    def __str__(self):
        return f'Group video: {self.description}'
