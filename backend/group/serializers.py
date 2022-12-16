from rest_framework import serializers

from group.models import Group


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
        fields = (
            'avatar_thumbnail',
            'avatar_display',
            'avatar_blurred',
            'name',
            'short_description',
            'long_description',
            'theme_name',
            'followers_count',
        )

    def get_theme_name(self, group):
        return group.theme.name
