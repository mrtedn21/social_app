from rest_framework import serializers

from group.models import Group
from photo.serializers import GroupPhotoSerializer
from post.serializers import GroupPostSerializer


class GroupCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = (
            'avatar',
            'name',
            'slug',
            'short_description',
            'long_description',
        )


class GroupListSerializer(serializers.ModelSerializer):
    avatar_thumbnail = serializers.ImageField()
    avatar_display = serializers.ImageField()
    avatar_blurred = serializers.ImageField()
    theme_name = serializers.SerializerMethodField()

    class Meta:
        model = Group
        # TODO поубирать лищние поля которые не используются во фронте, в том
        # TODO числе обычные поля и изображения. Причем во всех сериалайзерах
        fields = (
            'avatar_thumbnail',
            'avatar_display',
            'avatar_blurred',
            'name',
            'short_description',
            'long_description',
            'theme_name',
            'followers_count',
            'slug',
        )
        lookup_field = 'slug'

    def get_theme_name(self, group):
        return group.theme.name


class GroupRetrieveSerializer(GroupListSerializer):
    posts = GroupPostSerializer(many=True)
    photos = GroupPhotoSerializer(many=True)

    class Meta:
        model = Group
        fields = (
            'avatar_thumbnail',
            'avatar_display',
            'avatar_blurred',
            'name',
            'short_description',
            'long_description',
            'theme_name',
            'followers_count',
            'slug',
            'posts',
            'photos',
        )
