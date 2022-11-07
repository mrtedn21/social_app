from django_filters.rest_framework import FilterSet
from django_filters import filters

from photo.models import Photo


class PhotoFilter(FilterSet):
    person_pk = filters.NumberFilter(method='person_pk_filter')

    class Meta:
        model = Photo
        fields = ('person_pk',)

    @staticmethod
    def person_pk_filter(queryset, name, value):
        return queryset.filter(persons__pk__in=(value,))
