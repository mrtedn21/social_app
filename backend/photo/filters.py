from django_filters.rest_framework import FilterSet

from photo.models import GroupPhoto, PersonPhoto


class PhotoFilter(FilterSet):
    class Meta:
        model = PersonPhoto
        fields = ('person_id',)


class GroupFilter(FilterSet):
    class Meta:
        model = GroupPhoto
        fields = ('group_id',)
