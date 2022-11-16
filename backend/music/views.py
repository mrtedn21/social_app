from rest_framework import viewsets

from music.models import Song
from music.serializers import SongSerializer
from music.tasks import fill_song_fields_by_tags


class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        result = fill_song_fields_by_tags(response.data['pk'])
        print(result)
        return response
