from django.db import models
from django.db.models import Q, Index
from django.db.models.functions import Lower

from core.models import null_and_blank, MultiImageMeta


class Artist(models.Model, metaclass=MultiImageMeta):
    name = models.CharField(max_length=128, **null_and_blank)
    photo = models.ImageField(upload_to='music/artist_photos/', **null_and_blank)

    class Meta:
        indexes = (Index(Lower('name'), name='artist_lower_name_idx'),)

    def __str__(self):
        return f'Artist: {self.name}'


class Album(models.Model, metaclass=MultiImageMeta):
    name = models.CharField(max_length=128, **null_and_blank)
    cover = models.ImageField(upload_to='music/covers/', **null_and_blank)
    year = models.PositiveSmallIntegerField(**null_and_blank)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='albums', null=True)

    class Meta:
        constraints = (
            models.CheckConstraint(check=Q(year__gte=1900), name='year_gte_1900'),
            models.CheckConstraint(check=Q(year__lte=2022), name='year_lte_2022'),
        )

    def __str__(self):
        return f'Album: {self.name}'


class Song(models.Model):
    title = models.CharField(max_length=128, **null_and_blank)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, **null_and_blank)
    album = models.ForeignKey(Album, on_delete=models.CASCADE, **null_and_blank)
    file = models.FileField(upload_to='music/files/')

    def __str__(self):
        return f'Song: {self.title}'
