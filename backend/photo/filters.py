from django_filters.rest_framework import FilterSet
from photo.models import GroupPhoto, PersonPhoto
from django_filters import filters


class PersonPhotoFilter(FilterSet):
    class Meta:
        model = PersonPhoto
        fields = ('person_id',)


class GroupPhotoFilter(FilterSet):
    group_slug = filters.CharFilter(field_name='group__slug')

    class Meta:
        model = GroupPhoto
        fields = ('group_slug',)
