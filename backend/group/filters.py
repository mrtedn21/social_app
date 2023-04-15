import django_filters
from core.filters import FacetsFilterSet
from group.models import Group


class GroupFilter(FacetsFilterSet):
    theme_slug = django_filters.CharFilter(method='theme_slug_filter')
    theme_slug.specs = 'theme_slug_specs'
    name_like = django_filters.CharFilter(lookup_expr='icontains', field_name='name')

    class Meta:
        model = Group
        fields = ('theme_slug', 'name_like')

    @staticmethod
    def theme_slug_filter(queryset, field, value):
        return queryset.filter(theme__slug=value)

    @staticmethod
    def theme_slug_specs():
        themes = (
            Group.objects.all()
            .values('theme__name', 'theme__slug')
            .order_by('theme__name')
            .distinct()
        )
        return [{'slug': theme['theme__slug'], 'name': theme['theme__name']} for theme in themes]
