from django_filters.rest_framework import FilterSet
from music.models import GroupSong, PersonSong, Song
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


class CommonSongFilter(FilterSet):
    title = filters.CharFilter(field_name='title', lookup_expr='icontains')
    artist = filters.CharFilter(field_name='artist__name', lookup_expr='icontains')
    album = filters.CharFilter(field_name='album__name', lookup_expr='icontains')
    year_lte = filters.CharFilter(field_name='album__year', lookup_expr='lte')
    year_gte = filters.CharFilter(field_name='album__year', lookup_expr='gte')

    class Meta:
        model = Song
        fields = ('title', 'artist', 'album', 'year_lte', 'year_gte')
