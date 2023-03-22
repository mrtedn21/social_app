from photo.filters import GroupFilter, PhotoFilter
from photo.models import GroupPhoto, PersonPhoto
from photo.serializers import (GroupPhotoCreateSerializer,
                               GroupPhotoDetailSerializer,
                               GroupPhotoListSerializer,
                               PersonPhotoCreateSerializer,
                               PersonPhotoDetailSerializer,
                               PersonPhotoListSerializer)
from rest_framework import viewsets


class PersonPhotoViewSet(viewsets.ModelViewSet):
    queryset = PersonPhoto.objects.all()
    filterset_class = PhotoFilter

    def get_serializer_class(self):
        if self.action == 'create':
            return PersonPhotoCreateSerializer
        elif self.action == 'retrieve':
            return PersonPhotoDetailSerializer
        else:
            return PersonPhotoListSerializer

    def perform_create(self, serializer):
        serializer.save(person=self.request.user.person)


class GroupPhotoViewSet(viewsets.ModelViewSet):
    queryset = GroupPhoto.objects.all()
    filterset_class = GroupFilter

    def get_serializer_class(self):
        if self.action == 'create':
            return GroupPhotoCreateSerializer
        elif self.action == 'retrieve':
            return GroupPhotoDetailSerializer
        else:
            return GroupPhotoListSerializer
