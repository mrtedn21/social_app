from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK

from user_auth.serializers import AuthUserSerializer, RegisterUserSerializer
from user_auth.tasks import send_email


class AuthViewSet(viewsets.ModelViewSet):
    http_method_names = ('post',)
    serializer_class = AuthUserSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        user = authenticate(
            request,
            username=request.data.get('username'),
            password=request.data.get('password'),
        )

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response(token.key, status=HTTP_200_OK)
        else:
            return Response(
                'Username or password are incorrect',
                status=HTTP_400_BAD_REQUEST,
            )


class RegisterViewSet(viewsets.ModelViewSet):
    http_method_names = ('post',)
    serializer_class = RegisterUserSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.create_user(**serializer.data)
        token, _ = Token.objects.get_or_create(user=user)
        send_email.delay('test', 'some text')
        return Response(token.key, status=HTTP_200_OK)
