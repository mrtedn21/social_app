from message.models import Chat, Message
from message.serializers import (
    ChatListSerializer,
    MessageListSerializer,
    MessageCreateSerializer,
)
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError


class ChatViewSet(viewsets.ModelViewSet):
    serializer_class = ChatListSerializer

    def get_queryset(self):
        return Chat.objects.filter(participants__in=(self.request.user.person,)).order_by('-last_message__date_time')


class MessageViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.action == 'create':
            return MessageCreateSerializer
        else:
            return MessageListSerializer

    def get_queryset(self):
        try:
            chat_id = self.request.query_params['chat_id']
        except KeyError:
            raise ValidationError('chat_id query param is required by logic')
        return Message.objects.filter(chat_id=chat_id)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user.person)
