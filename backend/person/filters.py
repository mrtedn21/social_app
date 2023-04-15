import django_filters
from django_filters.rest_framework import FilterSet
from person.models import Person, person_name_annotation


class PersonFilter(FilterSet):
    search_by_name = django_filters.CharFilter(method='search_by_name_filter')

    class Meta:
        model = Person
        fields = ('search_by_name',)

    @staticmethod
    def search_by_name_filter(queryset, _, value):
        return queryset.annotate(name=person_name_annotation).filter(
            name__contains=str(value).lower()
        )
