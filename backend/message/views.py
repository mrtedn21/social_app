from rest_framework import viewsets

from message.models import Chat
from message.serializers import (
    ChatDetailSerializer,
    ChatListSerializer,
    MessageSerializer,
)


class ChatViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ChatDetailSerializer
        else:
            return ChatListSerializer

    def get_queryset(self):
        current_person = self.request.user.person
        chats = Chat.objects.filter(participants__in=(current_person,))
        return chats


class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    http_method_names = ('post',)

    def create(self, request, *args, **kwargs):
        print('kek')
        return super().create(request, *args, **kwargs)

