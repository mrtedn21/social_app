from core.serializers import MultiImageModelSerializer
from drf_extra_fields.fields import Base64ImageField
from photo.models import GroupPhoto, PersonPhoto
from rest_framework import serializers


class PersonPhotoCreateSerializer(serializers.ModelSerializer):
    image = Base64ImageField()

    class Meta:
        model = PersonPhoto
        fields = ('image', 'description')


# TODO use always this MultiImageModelSerializer
class PersonPhotoDetailSerializer(MultiImageModelSerializer):
    class Meta:
        model = PersonPhoto
        fields = '__all__'


class PersonPhotoListSerializer(serializers.ModelSerializer):
    image_thumbnail = serializers.ImageField()

    class Meta:
        model = PersonPhoto
        fields = ('pk', 'image_thumbnail')


class GroupPhotoCreateSerializer(serializers.ModelSerializer):
    image = Base64ImageField()

    class Meta:
        model = GroupPhoto
        fields = ('group', 'image', 'description')


class GroupPhotoDetailSerializer(serializers.ModelSerializer):
    image_display = serializers.ImageField()
    image_blurred = serializers.ImageField()
    image_thumbnail = serializers.ImageField()

    class Meta:
        model = GroupPhoto
        fields = '__all__'


class GroupPhotoListSerializer(serializers.ModelSerializer):
    image_thumbnail = serializers.ImageField()

    class Meta:
        model = GroupPhoto
        fields = ('pk', 'image_thumbnail')
