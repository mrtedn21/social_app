from rest_framework import viewsets

from photo.filters import PhotoFilter
from photo.models import Photo
from photo.serializers import PhotoSerializer, PhotoCreateSerializer


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    filterset_class = PhotoFilter

    def get_serializer_class(self):
        if self.action == 'create':
            return PhotoCreateSerializer
        else:
            return PhotoSerializer

    def perform_create(self, serializer):
        serializer.save(person=self.request.user.person)
