from rest_framework import serializers

from group.models import Group


class GroupCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = (
            'avatar',
            'name',
            'slug',
        )


class GroupListSerializer(serializers.ModelSerializer):
    avatar_thumbnail = serializers.ImageField()
    avatar_display = serializers.ImageField()
    avatar_blurred = serializers.ImageField()

    class Meta:
        model = Group
        fields = (
            'avatar_thumbnail',
            'avatar_display',
            'avatar_blurred',
            'name',
            'slug',
        )
