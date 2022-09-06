from rest_framework import viewsets
from rest_framework import permissions

from person.models import Person
from person.serializers import PersonSerializer


class PersonViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    permission_classes = (permissions.IsAuthenticated,)
