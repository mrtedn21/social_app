from rest_framework import serializers

from person.models import Person


class PersonListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('pk', 'first_name', 'last_name')


class PersonDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = (
            'user',
            'friends',
            'first_name',
            'last_name',
            'birth_date',
            'gender',
            'city',
            'languages',
        )