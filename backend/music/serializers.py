from core.fields import MP3Base64FileField
from music.models import GroupSong, Album, Artist, Song, PersonSong
from rest_framework import serializers


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


class PersonSongListSerializer(serializers.ModelSerializer):
    artist = serializers.CharField(source='song.artist.name')
    album = serializers.CharField(source='song.album.name')
    title = serializers.CharField(source='song.title')
    file = serializers.FileField(source='song.file')

    class Meta:
        model = PersonSong
        fields = ('artist', 'album', 'title', 'file', 'person')
