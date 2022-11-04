from rest_framework import viewsets

from photo.models import Photo
from photo.serializers import PhotoSerializer, PhotoCreateSerializer


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return PhotoCreateSerializer
        else:
            return PhotoSerializer
