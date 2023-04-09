from post.models import GroupPost, PersonPost
from rest_framework import serializers
from group.models import Group


class PersonPostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonPost
        fields = ('text',)


class BasePostSerializer(serializers.Serializer):
    date_time = serializers.SerializerMethodField()

    @staticmethod
    def get_date_time(obj: PersonPost):
        return obj.date_time.strftime('%d.%m.%y %H:%M')


class PersonPostSerializer(BasePostSerializer, serializers.ModelSerializer):
    class Meta:
        model = PersonPost
        fields = ('person', 'date_time', 'text', 'likes_count', 'pk')


class GroupPostSerializer(BasePostSerializer, serializers.ModelSerializer):
    class Meta:
        model = GroupPost
        fields = ('group', 'date_time', 'text', 'likes_count', 'pk')


class GroupPostCreateSerializer(BasePostSerializer, serializers.ModelSerializer):
    group = serializers.CharField()

    class Meta:
        model = GroupPost
        fields = ('group', 'text')

    def create(self, validated_data):
        group = Group.objects.get(slug=validated_data['group'])
        return GroupPost.objects.create(text=validated_data['text'], group=group)
