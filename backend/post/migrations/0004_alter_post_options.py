# Generated by Django 4.1.1 on 2022-12-03 15:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0003_post_likes_count'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='post',
            options={'ordering': ('-pk',)},
        ),
    ]
