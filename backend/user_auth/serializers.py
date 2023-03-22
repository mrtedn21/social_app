from django.contrib.auth.models import User
from person.models import Person
from rest_framework import serializers


class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')


class RegistrationSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=64)
    password = serializers.CharField(max_length=64)
    email = serializers.EmailField(max_length=64)
    first_name = serializers.CharField(max_length=64)
    last_name = serializers.CharField(max_length=64)
    birth_date = serializers.DateField()

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        
        person = Person.objects.create(
            user=user,
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            birth_date=validated_data['birth_date'],
        )
        return person
