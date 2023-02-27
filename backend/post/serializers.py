from rest_framework import serializers

from post.models import PersonPost


class PersonPostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonPost
        fields = ('text',)


class PersonPostSerializer(serializers.ModelSerializer):
    date_time = serializers.SerializerMethodField()

    class Meta:
        model = PersonPost
        fields = ('person', 'date_time', 'text', 'likes_count', 'pk')

    def get_date_time(self, obj: PersonPost):
        return obj.date_time.strftime('%d.%m.%y %H:%M')
