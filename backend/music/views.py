from rest_framework import viewsets

from music.models import Music
from music.serializers import MusicSerializer


class MusicViewSet(viewsets.ModelViewSet):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer
