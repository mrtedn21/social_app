# Generated by Django 4.1.1 on 2023-04-11 06:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('person', '0010_remove_person_friends'),
        ('group', '0005_alter_group_slug'),
        ('video', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='groupvideo',
            name='group',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='videos', to='group.group'),
        ),
        migrations.AlterField(
            model_name='personvideo',
            name='person',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='videos', to='person.person'),
        ),
    ]