from core.serializers import MultiImageModelSerializer
from video.models import GroupVideo, PersonVideo
from rest_framework import serializers


LIST_VIDEO_FIELDS = ('pk', 'name', 'preview_thumbnail')
CREATE_VIDEO_FIELDS = ('name', 'description', 'preview', 'video')
DETAIL_VIDEO_FIELDS = (
    'name',
    'description',
    'preview_blurred',
    'preview_display',
    'video',
    'date_time',
)


class PersonVideoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonVideo
        fields = ('person',) + CREATE_VIDEO_FIELDS


class PersonVideoDetailSerializer(MultiImageModelSerializer):
    class Meta:
        model = PersonVideo
        fields = DETAIL_VIDEO_FIELDS


class PersonVideoListSerializer(MultiImageModelSerializer):
    class Meta:
        model = PersonVideo
        fields = LIST_VIDEO_FIELDS


class GroupVideoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupVideo
        fields = ('group',) + CREATE_VIDEO_FIELDS


class GroupVideoDetailSerializer(MultiImageModelSerializer):
    class Meta:
        model = GroupVideo
        fields = DETAIL_VIDEO_FIELDS


class GroupVideoListSerializer(MultiImageModelSerializer):
    class Meta:
        model = GroupVideo
        fields = LIST_VIDEO_FIELDS
