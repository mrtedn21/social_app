from rest_framework import serializers

from person.models import Person, Country, Gender, Language, City


class PersonEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('first_name', 'last_name', 'birth_date', 'gender', 'city', 'languages')


class CitySerializer(serializers.ModelSerializer):
    country = serializers.CharField(source='country.name', required=False)

    class Meta:
        model = City
        fields = ('pk', 'name', 'country')


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


class PersonListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('pk', 'first_name', 'last_name')


class PersonDetailSerializer(serializers.ModelSerializer):
    friends = PersonListSerializer(many=True)
    languages = LanguageSerializer(many=True)
    city = CitySerializer()
    gender = GenderSerializer()

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
