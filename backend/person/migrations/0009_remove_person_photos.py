# Generated by Django 4.1.1 on 2022-11-10 04:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('person', '0008_alter_person_photos'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='person',
            name='photos',
        ),
    ]
