from rest_framework import serializers

from post.models import GroupPost, PersonPost


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
