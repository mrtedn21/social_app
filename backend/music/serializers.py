from rest_framework import serializers

from core.fields import MP3Base64FileField
from music.models import Artist, Album, Music


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = (
            'pk',
            'name',
            'photo',
        )


class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = (
            'pk',
            'name',
            'cover',
            'year',
        )


class MusicSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer(required=False)
    album = AlbumSerializer(required=False)
    file = MP3Base64FileField()

    class Meta:
        model = Music
        fields = (
            'pk',
            'title',
            'artist',
            'album',
            'file',
        )
