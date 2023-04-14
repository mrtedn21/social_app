from music.models import GroupSong, PersonSong
from music.serializers import (
    GroupSongCreateSerializer,
    GroupSongListSerializer,
    PersonSongListSerializer,
)
from music.tasks import fill_song_fields_by_tags
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED
from music.filters import GroupSongFilter, PersonSongFilter


class PersonSongViewSet(viewsets.ModelViewSet):
    queryset = PersonSong.objects.all().prefetch_related('person', 'song__album', 'song__artist')
    serializer_class = PersonSongListSerializer
    filterset_class = PersonSongFilter

    def perform_create(self, serializer):
        serializer.save(person=self.request.user.person)

    # def create(self, request, *args, **kwargs):
    #    serializer = self.get_serializer(data=request.data)
    #    serializer.is_valid(raise_exception=True)
    #    self.perform_create(serializer)
    #    fill_song_fields_by_tags(serializer.data['pk'])
    #    serializer = SongSerializer(instance=Song.objects.get(pk=serializer.data['pk']))
    #    headers = self.get_success_headers(serializer.data)
    #    return Response(serializer.data, status=HTTP_201_CREATED, headers=headers)


class GroupSongViewSet(viewsets.ModelViewSet):
    queryset = GroupSong.objects.all().prefetch_related('group', 'song__album', 'song__artist')
    filterset_class = GroupSongFilter

    def get_serializer_class(self):
        if self.action == 'create':
            return GroupSongCreateSerializer
        else:
            return GroupSongListSerializer
