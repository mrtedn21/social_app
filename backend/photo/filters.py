from django_filters.rest_framework import FilterSet

from photo.models import Photo


class PhotoFilter(FilterSet):
    class Meta:
        model = Photo
        fields = ('person_id',)
