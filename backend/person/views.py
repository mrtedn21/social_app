from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from drf_yasg.openapi import (
    TYPE_INTEGER,
    Schema,
    TYPE_OBJECT,
)
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from person.models import Person
from person.serializers import PersonSerializer


class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all().prefetch_related('friends')
    serializer_class = PersonSerializer
    permission_classes = (permissions.IsAuthenticated,)

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
        new_friend = get_object_or_404(User, pk=new_friend_pk)
        request.user.person.friends.add(new_friend.person)
        return Response('Added successfully')
