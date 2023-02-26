from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from group.filters import GroupFilter
from group.models import Group
from group.serializers import GroupCreateSerializer, GroupListSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all().select_related('theme')
    filterset_class = GroupFilter

    def get_serializer_class(self):
        if self.action == 'create':
            return GroupCreateSerializer
        else:
            return GroupListSerializer

    @action(detail=False, methods=('get',))
    def specs(self, request):
        facets_filter = self.filterset_class(
            data=request.GET, queryset=Group.objects.all(), request=request
        )
        return Response(data=facets_filter.specs(), status=HTTP_200_OK)
