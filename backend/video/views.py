from video.filters import GroupFilter, PersonFilter
from video.models import GroupVideo, PersonVideo
from video.serializers import (
    GroupVideoDetailSerializer,
    GroupVideoListSerializer,
    PersonVideoDetailSerializer,
    PersonVideoListSerializer,
)
from rest_framework import viewsets


class PersonVideoViewSet(viewsets.ModelViewSet):
    queryset = PersonVideo.objects.all()
    filterset_class = PersonFilter

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PersonVideoDetailSerializer
        else:
            return PersonVideoListSerializer

    def perform_create(self, serializer):
        serializer.save(person=self.request.user.person)


class GroupVideoViewSet(viewsets.ModelViewSet):
    queryset = GroupVideo.objects.all()
    filterset_class = GroupFilter

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return GroupVideoDetailSerializer
        else:
            return GroupVideoListSerializer
