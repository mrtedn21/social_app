# Generated by Django 4.1.1 on 2022-11-29 06:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('person', '0010_remove_person_friends'),
        ('photo', '0002_photo_person'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Photo',
            new_name='PersonPhoto',
        ),
    ]
