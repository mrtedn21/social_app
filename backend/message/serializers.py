from message.models import Chat, Message
from rest_framework import serializers


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = (
            'chat',
            'text',
            'date_time',
            'reply_to_message',
        )


class ChatListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('name', 'participants')


class ChatDetailSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True)

    class Meta:
        model = Chat
        fields = ('name', 'participants', 'messages')
