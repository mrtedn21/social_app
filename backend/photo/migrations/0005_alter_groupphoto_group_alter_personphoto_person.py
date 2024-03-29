# Generated by Django 4.1.1 on 2022-11-30 04:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('group', '0001_initial'),
        ('person', '0010_remove_person_friends'),
        ('photo', '0004_alter_personphoto_person_groupphoto'),
    ]

    operations = [
        migrations.AlterField(
            model_name='groupphoto',
            name='group',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='group.group'),
        ),
        migrations.AlterField(
            model_name='personphoto',
            name='person',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='person.person'),
        ),
    ]
