from tempfile import NamedTemporaryFile

import eyed3
import requests
from django.conf import settings

from slugify import slugify
from transliterate import translit

from music.models import Song


def fill_song_fields_by_tags(song_pk):
    song = Song.objects.get(id=song_pk)
    with requests.get(song.file.url, stream=True) as response:
        response.raise_for_status()
        with NamedTemporaryFile('wb') as file:
            for chunk in response.iter_content(chunk_size=8 * 1024):
                file.write(chunk)

            song_file = eyed3.load(file.name)
            if song_file is None:
                song.delete()
            if not song_file.tag or not song_file.tag.artist:
                return
            artist = song_file.tag.artist

    artist_en = slugify(artist)
    artist_ru = translit(artist, 'ru')

    params = {
        'key': settings.GOOGLE_API_KEY,
        'cx': settings.GOOGLE_SEARCH_ENGINE_ID,
        'q': artist_en,
    }
    response_en = requests.get('https://www.googleapis.com/customsearch/v1', params=params).json()
    if 'spelling' in response_en:
        artist_en = response_en['spelling']['correctedQuery']
        params['q'] = artist_en
        response_en = requests.get(
            'https://www.googleapis.com/customsearch/v1', params=params
        ).json()

    params['q'] = artist_ru
    response_ru = requests.get('https://www.googleapis.com/customsearch/v1', params=params).json()
    if 'spelling' in response_ru:
        artist_ru = response_ru['spelling']['correctedQuery']
        params['q'] = artist_ru
        response_ru = requests.get(
            'https://www.googleapis.com/customsearch/v1', params=params
        ).json()

    if (
        response_en['searchInformation']['totalResults']
        > response_ru['searchInformation']['totalResults']
    ):
        return artist_en
    else:
        return artist_ru
