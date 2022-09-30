from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.openapi import (
    TYPE_INTEGER,
    Schema,
    TYPE_OBJECT,
)
from drf_yasg.utils import swagger_auto_schema
from rest_framework import filters
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from person.filters import PersonFilter
from person.models import Person, Country, Gender, Language
from person.serializers import (
    PersonDetailSerializer,
    PersonListSerializer,
    GenderSerializer,
    LanguageSerializer,
    CountrySerializer,
)


class PersonViewSet(viewsets.ModelViewSet):
    http_method_names = ('post', 'get', 'put', 'patch')
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Person.objects.all().prefetch_related('friends')
    filter_backends = (filters.SearchFilter, DjangoFilterBackend)
    filterset_class = PersonFilter
    search_fields = ('first_name', 'last_name')

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PersonDetailSerializer
        else:
            return PersonListSerializer

    @swagger_auto_schema(
        request_body=Schema(
            type=TYPE_OBJECT,
            properties={
                'user_id': Schema(type=TYPE_INTEGER)
            }
        )
    )
    @action(detail=False, methods=('post',))
    def add_to_friend(self, request):
        new_friend_pk = request.data['user_id']
        new_friend = get_object_or_404(Person, pk=new_friend_pk)

        if new_friend == request.user.person:
            return Response(
                'It is so sadly when only one your friend is you',
                HTTP_400_BAD_REQUEST,
            )
        request.user.person.friends.add(new_friend)
        return Response('Added successfully', HTTP_200_OK)


class CountyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Country.objects.all().prefetch_related('city_set')
    serializer_class = CountrySerializer
    permission_classes = (permissions.IsAuthenticated,)


class LanguageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    permission_classes = (permissions.IsAuthenticated,)


class GenderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Gender.objects.all()
    serializer_class = GenderSerializer
    permission_classes = (permissions.IsAuthenticated,)
