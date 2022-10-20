from rest_framework import serializers

from post.models import Post


class PostSerializer(serializers.ModelSerializer):
    date_time = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('person', 'date_time', 'text', 'likes_count', 'pk')

    def get_date_time(self, obj: Post):
        return obj.date_time.strftime('%d.%m.%y %H:%M')
