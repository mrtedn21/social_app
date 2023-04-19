from drf_extra_fields.fields import Base64ImageField
from person.models import City, Country, Gender, Language, Person
from rest_framework import serializers
from core.serializers import MultiImageModelSerializer
from dateutil.relativedelta import relativedelta
from django.utils.timezone import now


class CitySerializer(serializers.ModelSerializer):
    country = serializers.CharField(source='country.name', required=False)
    country_pk = serializers.CharField(source='country.pk', required=False)

    class Meta:
        model = City
        fields = ('pk', 'name', 'country', 'country_pk')


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
    avatar = Base64ImageField()

    class Meta:
        model = Person
        fields = ('avatar', 'first_name', 'last_name', 'birth_date', 'gender', 'city', 'languages')


class PersonListSerializer(MultiImageModelSerializer):
    city = CitySerializer()

    class Meta:
        model = Person
        fields = ('pk', 'first_name', 'last_name', 'avatar_thumbnail', 'city')


class PersonDetailSerializer(MultiImageModelSerializer):
    languages = LanguageSerializer(many=True)
    city = CitySerializer()
    gender = GenderSerializer()
    age = serializers.SerializerMethodField()

    class Meta:
        model = Person
        fields = (
            'pk',
            'first_name',
            'avatar_display',
            'avatar_blurred',
            'avatar_thumbnail',
            'last_name',
            'birth_date',
            'gender',
            'city',
            'languages',
            'age',
        )

    @staticmethod
    def get_age(person: Person):
        return person.get_age()


class PersonSettingsSerializer(serializers.Serializer):
    countries = serializers.SerializerMethodField()
    languages = serializers.SerializerMethodField()
    genders = serializers.SerializerMethodField()

    def get_countries(self, obj):
        countries = Country.objects.all().prefetch_related('cities')
        return CountrySerializer(countries, many=True, context=self.context).data

    def get_languages(self, obj):
        languages = Language.objects.all()
        return LanguageSerializer(languages, many=True, context=self.context).data

    def get_genders(self, obj):
        genders = Gender.objects.all()
        return GenderSerializer(genders, many=True, context=self.context).data
