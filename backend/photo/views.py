from rest_framework import viewsets

from photo.filters import PhotoFilter
from photo.models import PersonPhoto
from photo.serializers import PersonPhotoSerializer, PhotoCreateSerializer


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = PersonPhoto.objects.all()
    filterset_class = PhotoFilter

    def get_serializer_class(self):
        if self.action == 'create':
            return PhotoCreateSerializer
        else:
            return PersonPhotoSerializer

    def perform_create(self, serializer):
        serializer.save(person=self.request.user.person)
