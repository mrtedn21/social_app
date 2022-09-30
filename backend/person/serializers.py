from rest_framework import serializers

from person.models import Person, Country, Gender, Language, City


class PersonListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('pk', 'first_name', 'last_name')


class PersonDetailSerializer(serializers.ModelSerializer):
    friends = PersonListSerializer(many=True)

    class Meta:
        model = Person
        fields = (
            'pk',
            'friends',
            'first_name',
            'last_name',
            'birth_date',
            'gender',
            'city',
            'languages',
        )


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('pk', 'name')


class CountrySerializer(serializers.ModelSerializer):
    city_set = CitySerializer(many=True)

    class Meta:
        model = Country
        fields = ('pk', 'name', 'city_set')


class GenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gender
        fields = ('pk', 'name')


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('pk', 'name')
