from django_filters.rest_framework import FilterSet
from post.models import GroupPost, PersonPost
from django_filters import filters


class PersonPostFilter(FilterSet):
    class Meta:
        model = PersonPost
        fields = ('person_id',)


class GroupPostFilter(FilterSet):
    group_slug = filters.CharFilter(field_name='group__slug')

    class Meta:
        model = GroupPost
        fields = ('group_slug',)
