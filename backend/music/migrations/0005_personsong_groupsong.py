# Generated by Django 4.1.1 on 2023-04-06 05:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('group', '0005_alter_group_slug'),
        ('person', '0010_remove_person_friends'),
        ('music', '0004_album_artist'),
    ]

    operations = [
        migrations.CreateModel(
            name='PersonSong',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='person.person')),
                ('song', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='music.song')),
            ],
        ),
        migrations.CreateModel(
            name='GroupSong',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='group.group')),
                ('song', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='music.song')),
            ],
        ),
    ]