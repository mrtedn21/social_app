from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK

from person.models import Person
from user_auth.serializers import AuthUserSerializer, RegistrationSerializer
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
            return Response({'token': token.key}, status=HTTP_200_OK)
        else:
            return Response(
                'Username or password are incorrect',
                status=HTTP_400_BAD_REQUEST,
            )


class RegisterViewSet(viewsets.ModelViewSet):
    http_method_names = ('post', 'get')
    serializer_class = RegistrationSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        person = serializer.save()
        url = reverse('register-submit', kwargs={'uuid_param': person.uuid})

        text = 'To submit registration, proceed by link in your email'
        send_email.delay('Submit', f'http://localhost:8000{url}')
        return Response(text, status=HTTP_200_OK)

    @action(detail=False, url_path='submit/(?P<uuid_param>[^/.]+)')
    def submit(self, request, uuid_param):
        try:
            person = Person.objects.get(uuid=uuid_param, submit_email=False)
        except Person.DoesNotExist:
            return Response('Invalid link', status=HTTP_400_BAD_REQUEST)

        person.submit_email = True
        person.save(update_fields=('submit_email',))
        token, _ = Token.objects.get_or_create(user=person.user)
        return Response({'token': token.key}, status=HTTP_200_OK)

