from django.db import models
from django.db.models import Q

from core.models import null_and_blank, MultiImageMeta


class Artist(models.Model, metaclass=MultiImageMeta):
    name = models.CharField(max_length=128, **null_and_blank)
    photo = models.ImageField(upload_to='music/artist_photos/', **null_and_blank)


class Album(models.Model, metaclass=MultiImageMeta):
    name = models.CharField(max_length=128, **null_and_blank)
    cover = models.ImageField(upload_to='music/covers/', **null_and_blank)
    year = models.PositiveSmallIntegerField(**null_and_blank)

    class Meta:
        constraints = (
            models.CheckConstraint(check=Q(year__gte=1900), name='year_gte_1900'),
            models.CheckConstraint(check=Q(year__lte=2022), name='year_lte_2022'),
        )


class Music(models.Model):
    title = models.CharField(max_length=128, **null_and_blank)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, **null_and_blank)
    album = models.ForeignKey(Album, on_delete=models.CASCADE, **null_and_blank)
    file = models.FileField(upload_to='music/files/')
