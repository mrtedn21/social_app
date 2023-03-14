from copy import copy

from django.contrib.auth.models import User
from django.db import models
from imagekit.models import ImageSpecField
from imagekit.processors import Thumbnail

from core.processors import Blur


null_and_blank = {'blank': True, 'null': True}


class MultiImageMeta(models.base.ModelBase):
    def __new__(mcs, name, bases, dct):
        # TODO Оптимизировать pillow чтобы работал быстро
        dct_copy = copy(dct)
        for field_name, field_obj in dct_copy.items():
            if not isinstance(field_obj, models.ImageField):
                continue

            display_field_name = f'{field_name}_display'
            dct[display_field_name] = ImageSpecField(
                source=field_name,
                processors=(Thumbnail(width=1000, height=1000, crop=False),),
                format='JPEG',
                options={'quality': 95},
            )

            blurred_field_name = f'{field_name}_blurred'
            dct[blurred_field_name] = ImageSpecField(
                source=field_name,
                processors=(Blur(), Thumbnail(width=800, height=800, crop=False)),
                format='JPEG',
                options={'quality': 60},
            )

            thumbnail_field_name = f'{field_name}_thumbnail'
            dct[thumbnail_field_name] = ImageSpecField(
                source=field_name,
                processors=(Thumbnail(width=200, height=200, crop=True),),
                format='JPEG',
                options={'quality': 95},
            )
        return super().__new__(mcs, name, bases, dct)
