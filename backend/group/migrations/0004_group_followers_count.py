# Generated by Django 4.1.1 on 2022-12-16 05:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('group', '0003_grouptheme_group_followers_group_theme'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='followers_count',
            field=models.PositiveIntegerField(default=0, help_text='Auto calculated field'),
        ),
    ]

