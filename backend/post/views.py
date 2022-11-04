from rest_framework import viewsets

from post.models import Post
from post.serializers import PostSerializer, PostCreateSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return PostCreateSerializer
        else:
            return PostSerializer

    def perform_create(self, serializer):
        serializer.save(person=self.request.user.person)
