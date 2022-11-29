from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import views
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from person.filters import PersonFilter
from person.models import Person
from person.serializers import (
    PersonDetailSerializer,
    PersonEditSerializer,
    PersonListSerializer,
    PersonSettingsSerializer,
)


class PersonViewSet(viewsets.ModelViewSet):
    http_method_names = ('post', 'get', 'put', 'patch')
    # TODO make separate querysets for list and detail
    # Because for detail needs subqueries but for list no needs
    queryset = Person.objects.all().prefetch_related('languages')
    filter_backends = (filters.SearchFilter, DjangoFilterBackend)
    filterset_class = PersonFilter
    search_fields = ('first_name', 'last_name')

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PersonDetailSerializer
        elif self.action in ('update', 'partial_update'):
            return PersonEditSerializer
        else:
            return PersonListSerializer


class PersonSettingsView(views.APIView):
    def get(self, request, format=None):
        serializer = PersonSettingsSerializer(Person.objects.none())
        return Response(serializer.data, status=HTTP_200_OK)
