from group.models import Group
from video.filters import GroupVideoFilter, PersonVideoFilter
from video.models import GroupVideo, PersonVideo
from video.serializers import (
    GroupVideoCreateSerializer,
    GroupVideoDetailSerializer,
    GroupVideoListSerializer,
    PersonVideoCreateSerializer,
    PersonVideoDetailSerializer,
    PersonVideoListSerializer,
)
from rest_framework import viewsets


class PersonVideoViewSet(viewsets.ModelViewSet):
    queryset = PersonVideo.objects.all()
    filterset_class = PersonVideoFilter

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PersonVideoDetailSerializer
        elif self.action == 'create':
            return PersonVideoCreateSerializer
        else:
            return PersonVideoListSerializer

    def perform_create(self, serializer):
        serializer.save(person=self.request.user.person)


class GroupVideoViewSet(viewsets.ModelViewSet):
    queryset = GroupVideo.objects.all()
    filterset_class = GroupVideoFilter

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return GroupVideoDetailSerializer
        elif self.action == 'create':
            return GroupVideoCreateSerializer
        else:
            return GroupVideoListSerializer

    def perform_create(self, serializer):
        group = Group.objects.get(slug=self.request.data['group'])
        serializer.save(group=group)
