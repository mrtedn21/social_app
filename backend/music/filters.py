from django_filters.rest_framework import FilterSet
from music.models import GroupSong, PersonSong
from django_filters import filters


class PersonSongFilter(FilterSet):
    class Meta:
        model = PersonSong
        fields = ('person_id',)


class GroupSongFilter(FilterSet):
    group_slug = filters.CharFilter(field_name='group__slug')

    class Meta:
        model = GroupSong
        fields = ('group_slug',)
