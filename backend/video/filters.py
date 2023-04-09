from django_filters.rest_framework import FilterSet
from video.models import GroupVideo, PersonVideo
from django_filters import filters


class PersonVideoFilter(FilterSet):
    class Meta:
        model = PersonVideo
        fields = ('person_id',)


class GroupVideoFilter(FilterSet):
    group_slug = filters.CharFilter(field_name='group__slug')

    class Meta:
        model = GroupVideo
        fields = ('group_slug',)
