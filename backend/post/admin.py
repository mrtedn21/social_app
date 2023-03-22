from django.contrib import admin
from post.models import GroupPost, PersonPost


@admin.register(PersonPost)
class PersonPostAdmin(admin.ModelAdmin):
    pass


@admin.register(GroupPost)
class GroupPostAdmin(admin.ModelAdmin):
    pass
