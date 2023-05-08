from message.models import Chat, Message
from rest_framework import serializers
from person.serializers import PersonListSerializer


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
    chat = serializers.CharField(required=False)
    target_person = serializers.CharField(required=False, read_only=True)

    class Meta:
        model = Message
        fields = ('chat', 'text', 'reply_to_message', 'target_person')

    def validate(self, attrs):
        return super().validate(attrs)

    def get_fields(self):
        return super().get_fields()

    def save(self, **kwargs):
        return super().save(**kwargs)


class ChatListSerializer(serializers.ModelSerializer):
    last_message = MessageListSerializer()
    first_person = PersonListSerializer()
    second_person = PersonListSerializer()

    class Meta:
        model = Chat
        fields = ('pk', 'name', 'participants', 'last_message', 'type', 'first_person', 'second_person')
