from message.models import Chat, Message
from message.serializers import (
    ChatListSerializer,
    MessageListSerializer,
    MessageCreateSerializer,
)
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from django.db.models import Q
from person.models import Person


class ChatViewSet(viewsets.ModelViewSet):
    serializer_class = ChatListSerializer

    def get_queryset(self):
        return Chat.objects.filter(
            Q(participants__in=(self.request.user.person,)) |
            Q(first_person=self.request.user.person) |
            Q(second_person=self.request.user.person)
        ).order_by('-last_message__date_time')


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
        chat_pk = self.request.data.get('chat')
        if chat_pk:
            chat = Chat.objects.get(pk=int(chat_pk))
        else:
            target_person = Person.objects.get(pk=int(self.request.data['target_person']))
            chat = Chat.objects.create(first_person=self.request.user.person, second_person=target_person)
        serializer.save(created_by=self.request.user.person, chat=chat)
