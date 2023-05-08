from django.db import models
from person.models import Person
from core.models import null_and_blank


class Chat(models.Model):
    class Types(models.TextChoices):
        DIRECT = 'direct'
        GROUP = 'group'
        SELF = 'self'

    name = models.CharField(max_length=64, **null_and_blank)
    participants = models.ManyToManyField(Person, related_name='chats')
    last_message = models.ForeignKey('message.Message', on_delete=models.SET_NULL, related_name='chat_for_last', **null_and_blank)
    type = models.CharField(max_length=16, choices=Types.choices, default=Types.DIRECT)
    first_person = models.ForeignKey(Person, on_delete=models.CASCADE,  related_name='first_person_chat', **null_and_blank)
    second_person = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='second_person_chat', **null_and_blank)


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
