from core.models import MultiImageMeta, null_and_blank
from django.db import models
from group.models import Group
from person.models import Person


class BasePhoto(models.Model, metaclass=MultiImageMeta):
    image = models.ImageField(upload_to='photos')
    description = models.TextField(blank=True, null=True)
    date_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class PersonPhoto(BasePhoto):
    person = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='photos')

    def __str__(self):
        return f'Person photo: {self.description}'


class GroupPhoto(BasePhoto):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='photos')

    def __str__(self):
        return f'Group photo: {self.description}'
