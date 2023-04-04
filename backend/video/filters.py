from django_filters.rest_framework import FilterSet
from video.models import GroupVideo, PersonVideo


class PersonFilter(FilterSet):
    class Meta:
        model = PersonVideo
        fields = ('person_id',)


class GroupFilter(FilterSet):
    class Meta:
        model = GroupVideo
        fields = ('group_id',)
