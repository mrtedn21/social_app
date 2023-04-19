import django_filters
from django_filters.rest_framework import FilterSet
from person.models import Person, person_name_annotation
from django.utils.timezone import now
from dateutil.relativedelta import relativedelta
from decimal import Decimal
from django.db.models import QuerySet


class PersonFilter(FilterSet):
    search_by_name = django_filters.CharFilter(method='search_by_name_filter')
    age_gt = django_filters.NumberFilter(method='age_filter')
    age_lt = django_filters.NumberFilter(method='age_filter')

    class Meta:
        model = Person
        fields = ('search_by_name', 'age_gt', 'age_lt')

    @staticmethod
    def search_by_name_filter(queryset, _, value):
        return queryset.annotate(name=person_name_annotation).filter(
            name__contains=str(value).lower()
        )

    @staticmethod
    def age_filter(queryset: QuerySet[Person], field: str, value: Decimal) -> QuerySet[Person]:
        date_time_value = now().date() - relativedelta(years=int(value))
        if field.endswith('gt'):
            return queryset.filter(birth_date__lt=date_time_value)
        else:
            return queryset.filter(birth_date__gt=date_time_value)
