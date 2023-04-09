from core.fields import MP3Base64FileField
from music.models import GroupSong, Album, Artist, Song, PersonSong
from rest_framework import serializers
from person.models import Person


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
    pk = serializers.IntegerField(source='song.id', required=False)
    artist = serializers.CharField(source='song.artist.name')
    album = serializers.CharField(source='song.album.name')
    title = serializers.CharField(source='song.title')
    file = serializers.FileField(source='song.file')
    person = serializers.PrimaryKeyRelatedField(queryset=Person.objects.all(), required=False)

    class Meta:
        model = PersonSong
        fields = ('pk', 'artist', 'album', 'title', 'file', 'person')

    def create(self, validated_data):
        song = validated_data['song']
        artist, _ = Artist.objects.get_or_create(name=song['artist']['name'])
        album, _ = Album.objects.get_or_create(name=song['album']['name'])
        song = Song.objects.create(
            artist=artist, album=album, title=song['title'], file=song['file']
        )
        return PersonSong.objects.create(song=song, person=validated_data['person'])
