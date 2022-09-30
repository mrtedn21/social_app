from django.conf import settings
from django_filters.rest_framework import FilterSet

from person.models import Person


class PersonFilter(FilterSet):
    class Meta:
        model = Person
        fields = {
            'first_name': settings.DEFAULT_TEXT_FILTER_LOOKUPS,
            'last_name': settings.DEFAULT_TEXT_FILTER_LOOKUPS,
            'birth_date': settings.DEFAULT_TEXT_FILTER_LOOKUPS,
        }
