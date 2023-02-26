from django_filters.rest_framework import FilterSet


class FacetsFilterSet(FilterSet):
    def specs(self):
        result = list()
        for filter_name, filter_object in self.filters.items():
            if not hasattr(filter_object, 'specs'):
                continue
            specs_method = getattr(self, filter_object.specs)
            result.append(
                {
                    'name': filter_name,
                    'values': specs_method(),
                }
            )
        return result
