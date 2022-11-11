from rest_framework import serializers

from core.fields import MP3Base64FileField
from music.models import Artist, Album, Song


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


class SongSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer(required=False)
    album = AlbumSerializer(required=False)
    file = MP3Base64FileField()

    class Meta:
        model = Song
        fields = (
            'pk',
            'title',
            'artist',
            'album',
            'file',
        )
