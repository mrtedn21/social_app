from django.contrib import admin
from group.models import Group, GroupTheme


@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'short_description', 'theme')


@admin.register(GroupTheme)
class GroupThemeAdmin(admin.ModelAdmin):
    pass
