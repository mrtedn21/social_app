from imagekit.models import ImageSpecField
from rest_framework import serializers


class MultiImageModelSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        model = self.Meta.model
        model_fields = dir(model)
        for field_name in model_fields:
            field = getattr(model, field_name)
            if type(field) == ImageSpecField and field_name in self.fields:
                self.fields[field_name] = serializers.ImageField()
