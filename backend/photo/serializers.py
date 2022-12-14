from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers

from photo.models import PersonPhoto


class PhotoCreateSerializer(serializers.ModelSerializer):
    image = Base64ImageField()

    class Meta:
        model = PersonPhoto
        fields = ('image', 'description')


class PhotoSerializer(serializers.ModelSerializer):
    image_display = serializers.ImageField()
    image_blurred = serializers.ImageField()
    image_thumbnail = serializers.ImageField()

    class Meta:
        model = PersonPhoto
        fields = (
            'pk',
            'person_id',
            'image_display',
            'image_blurred',
            'image_thumbnail',
            'description',
            'date_time',
        )
