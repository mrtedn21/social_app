from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from auth.serializers import UserSerializer


class AuthView(generics.CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        user = authenticate(
            request,
            username=serializer.initial_data['username'],
            password=serializer.initial_data['password'],
        )

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response(token.key)
        else:
            return Response('Username or password are incorrect')
