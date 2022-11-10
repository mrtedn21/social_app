from rest_framework import serializers

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
    artist = ArtistSerializer()
    album = AlbumSerializer()

    class Meta:
        model = Music
        fields = (
            'pk',
            'title',
            'artist',
            'album',
            'file',
        )
