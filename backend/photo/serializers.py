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
        fields = ('image_blurred', 'image_display', 'description', 'date_time', 'person')


class PersonPhotoListSerializer(MultiImageModelSerializer):
    class Meta:
        model = PersonPhoto
        fields = ('pk', 'image_thumbnail')


class GroupPhotoCreateSerializer(serializers.ModelSerializer):
    image = Base64ImageField()

    class Meta:
        model = GroupPhoto
        fields = ('group', 'image', 'description')


class GroupPhotoDetailSerializer(MultiImageModelSerializer):
    class Meta:
        model = GroupPhoto
        fields = ('image_blurred', 'image_display', 'description', 'date_time', 'group')


class GroupPhotoListSerializer(MultiImageModelSerializer):
    class Meta:
        model = GroupPhoto
        fields = ('pk', 'image_thumbnail')
