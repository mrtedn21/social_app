from message.models import Chat, Message
from rest_framework import serializers


class MessageListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = (
            'created_by',
            'chat',
            'text',
            'date_time',
            'reply_to_message',
        )


class MessageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('chat', 'text', 'reply_to_message')


class ChatListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('name', 'participants')
