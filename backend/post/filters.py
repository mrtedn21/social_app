from django_filters.rest_framework import FilterSet
from post.models import GroupPost, PersonPost


class PersonPostFilter(FilterSet):
    class Meta:
        model = PersonPost
        fields = ('person_id',)


class GroupPostFilter(FilterSet):
    class Meta:
        model = GroupPost
        fields = ('group_id',)
