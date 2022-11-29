from django_filters.rest_framework import FilterSet

from photo.models import PersonPhoto


class PhotoFilter(FilterSet):
    class Meta:
        model = PersonPhoto
        fields = ('person_id',)
