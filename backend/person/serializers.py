from rest_framework import serializers

from person.models import Person


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('pk', 'friends', 'first_name', 'last_name', 'birth_date')
