from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED

from music.models import Song
from music.serializers import SongSerializer
from music.tasks import fill_song_fields_by_tags


class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        fill_song_fields_by_tags(serializer.data['pk'])
        serializer = SongSerializer(instance=Song.objects.get(pk=serializer.data['pk']))
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=HTTP_201_CREATED, headers=headers)
