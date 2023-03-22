from message.models import Chat
from message.serializers import (ChatDetailSerializer, ChatListSerializer,
                                 MessageSerializer)
from rest_framework import viewsets


class ChatViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ChatDetailSerializer
        else:
            return ChatListSerializer

    def get_queryset(self):
        if hasattr(self.request.user, 'person'):
            current_person = self.request.user.person
            return Chat.objects.filter(participants__in=(current_person,))
        else:
            return Chat.objects.none()


class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    http_method_names = ('post',)

    def create(self, request, *args, **kwargs):
        print('kek')
        return super().create(request, *args, **kwargs)
