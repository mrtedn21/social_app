from rest_framework import viewsets

from group.models import Group
from group.serializers import GroupCreateSerializer, GroupListSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return GroupCreateSerializer
        else:
            return GroupListSerializer
