from rest_framework import serializers

from post.models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('person', 'date_time', 'text', 'likes_count')
