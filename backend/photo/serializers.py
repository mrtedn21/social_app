from rest_framework import serializers

from photo.models import Photo


class PhotoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ('image', 'description', 'date_time')


class PhotoSerializer(serializers.ModelSerializer):
    image_display = serializers.ImageField()
    image_blurred = serializers.ImageField()
    image_thumbnail = serializers.ImageField()

    class Meta:
        model = Photo
        fields = (
            'image_display',
            'image_blurred',
            'image_thumbnail',
            'description',
            'date_time',
        )
