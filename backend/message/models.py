from django.db import models
from person.models import Person
from core.models import null_and_blank


class Chat(models.Model):
    name = models.CharField(max_length=64, null=True, blank=True)
    participants = models.ManyToManyField(Person, related_name='chats')
    last_message = models.ForeignKey('message.Message', on_delete=models.SET_NULL, **null_and_blank, related_name='chat_for_last')

    def __str__(self):
        return f'Chat: {self.name}'


class Message(models.Model):
    created_by = models.ForeignKey(Person, on_delete=models.PROTECT, related_name='messages')
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')
    text = models.TextField()
    date_time = models.DateTimeField(auto_now_add=True, db_index=True)
    reply_to_message = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f'Message of text: {self.text}'

    class MessageManager(models.Manager):
        def create(self, chat: Chat, **kwargs):
            message = super().create(chat=chat, **kwargs)
            chat.last_message = message
            chat.save(update_fields=('last_message',))
            return message

    objects = MessageManager()
