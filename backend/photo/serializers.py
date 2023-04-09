from core.serializers import MultiImageModelSerializer
from drf_extra_fields.fields import Base64ImageField
from photo.models import GroupPhoto, PersonPhoto
from rest_framework import serializers
from group.models import Group


LIST_IMAGE_FIELDS = ('pk', 'image_thumbnail', 'image_display')
DETAIL_IMAGE_FIELDS = ('image_blurred', 'image_display', 'description', 'date_time')


class PersonPhotoCreateSerializer(serializers.ModelSerializer):
    image = Base64ImageField()

    class Meta:
        model = PersonPhoto
        fields = ('image', 'description')


class PersonPhotoListSerializer(MultiImageModelSerializer):
    class Meta:
        model = PersonPhoto
        fields = LIST_IMAGE_FIELDS


class PersonPhotoDetailSerializer(MultiImageModelSerializer):
    class Meta:
        model = PersonPhoto
        fields = DETAIL_IMAGE_FIELDS


class GroupPhotoCreateSerializer(serializers.ModelSerializer):
    image = Base64ImageField()
    group = serializers.CharField()

    class Meta:
        model = GroupPhoto
        fields = ('group', 'image', 'description')

    def create(self, validated_data):
        group = Group.objects.get(slug=validated_data['group'])
        description = validated_data.get('description')
        result_data = {'image': validated_data['image'], 'group': group}
        if description:
            result_data['description'] = description
        return GroupPhoto.objects.create(**result_data)


class GroupPhotoDetailSerializer(MultiImageModelSerializer):
    class Meta:
        model = GroupPhoto
        fields = DETAIL_IMAGE_FIELDS


class GroupPhotoListSerializer(MultiImageModelSerializer):
    class Meta:
        model = GroupPhoto
        fields = LIST_IMAGE_FIELDS
