from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from person.filters import PersonFilter
from person.models import Person
from person.serializers import (
    PersonDetailSerializer,
    PersonEditSerializer,
    PersonListSerializer,
    PersonSettingsSerializer,
)
from rest_framework import filters, views, viewsets
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.decorators import action


class PersonViewSet(viewsets.ModelViewSet):
    http_method_names = ('post', 'get', 'put', 'patch')
    # TODO make separate querysets for list and detail
    # Because for detail needs subqueries but for list no needs
    queryset = Person.objects.all().prefetch_related('languages')
    filterset_class = PersonFilter

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PersonDetailSerializer
        elif self.action in ('update', 'partial_update'):
            return PersonEditSerializer
        else:
            return PersonListSerializer

    @action(detail=True, methods=('get',))
    def can_i_edit(self, request, pk):
        return Response({'result': request.user.person.pk == int(pk)}, HTTP_200_OK)


class PersonSettingsView(views.APIView):
    def get(self, request, *args):
        serializer = PersonSettingsSerializer(Person.objects.none())
        return Response(serializer.data, status=HTTP_200_OK)


class WhoAmIView(views.APIView):
    def get(self, request, *args):
        return Response({'person_pk': request.user.person.pk}, status=HTTP_200_OK)
