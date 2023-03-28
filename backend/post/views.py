from post.models import GroupPost, PersonPost
from post.serializers import GroupPostSerializer, PersonPostCreateSerializer, PersonPostSerializer
from rest_framework import viewsets
from post.filters import GroupPostFilter, PersonPostFilter


class PersonPostViewSet(viewsets.ModelViewSet):
    queryset = PersonPost.objects.all()
    serializer_class = PersonPostSerializer
    filterset_class = PersonPostFilter

    def get_serializer_class(self):
        if self.action == 'create':
            return PersonPostCreateSerializer
        else:
            return PersonPostSerializer

    def perform_create(self, serializer):
        serializer.save(person=self.request.user.person)


class GroupPostViewSet(viewsets.ModelViewSet):
    queryset = GroupPost.objects.all()
    serializer_class = GroupPostSerializer
    filterset_class = GroupPostFilter
