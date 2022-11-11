from drf_extra_fields.fields import Base64FileField


class MP3Base64FileField(Base64FileField):
    ALLOWED_TYPES = ['mp3']

    def get_file_extension(self, filename, decoded_file):
        return 'mp3'
