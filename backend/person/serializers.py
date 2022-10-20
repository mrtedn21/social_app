from rest_framework import serializers

from person.models import Person, Country, Gender, Language, City
from post.serializers import PostSerializer


class CitySerializer(serializers.ModelSerializer):
    country = serializers.CharField(source='country.name', required=False)

    class Meta:
        model = City
        fields = ('pk', 'name', 'country')


class CountrySerializer(serializers.ModelSerializer):
    cities = CitySerializer(many=True)

    class Meta:
        model = Country
        fields = ('pk', 'name', 'cities')


class GenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gender
        fields = ('pk', 'name')


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('pk', 'name')


class PersonEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('avatar', 'first_name', 'last_name', 'birth_date', 'gender', 'city', 'languages')


class PersonListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('pk', 'first_name', 'last_name')


class PersonDetailSerializer(serializers.ModelSerializer):
    friends = PersonListSerializer(many=True)
    languages = LanguageSerializer(many=True)
    city = CitySerializer()
    gender = GenderSerializer()
    posts = PostSerializer(many=True)

    avatar_display = serializers.ImageField()
    avatar_blurred = serializers.ImageField()
    avatar_thumbnail = serializers.ImageField()

    class Meta:
        model = Person
        fields = (
            'pk',
            'friends',
            'first_name',
            'avatar_display',
            'avatar_blurred',
            'avatar_thumbnail',
            'last_name',
            'birth_date',
            'gender',
            'city',
            'languages',
            'posts',
        )
