from django.contrib import admin
from music.models import Artist, Album, Song, PersonSong, GroupSong

admin.site.register(Artist)
admin.site.register(Album)
admin.site.register(Song)
admin.site.register(PersonSong)
admin.site.register(GroupSong)
