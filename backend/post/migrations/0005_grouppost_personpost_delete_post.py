# Generated by Django 4.1.1 on 2023-02-27 06:04

import ckeditor.fields
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('group', '0005_alter_group_slug'),
        ('person', '0010_remove_person_friends'),
        ('post', '0004_alter_post_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='GroupPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_time', models.DateTimeField(auto_now_add=True)),
                ('text', ckeditor.fields.RichTextField()),
                ('likes_count', models.PositiveIntegerField(default=0)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='group.group')),
                ('liked_by', models.ManyToManyField(blank=True, related_name='liked_group_posts', to='person.person')),
            ],
            options={
                'ordering': ('-pk',),
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='PersonPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_time', models.DateTimeField(auto_now_add=True)),
                ('text', ckeditor.fields.RichTextField()),
                ('likes_count', models.PositiveIntegerField(default=0)),
                ('liked_by', models.ManyToManyField(blank=True, related_name='liked_person_posts', to='person.person')),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='person.person')),
            ],
            options={
                'ordering': ('-pk',),
                'abstract': False,
            },
        ),
        migrations.DeleteModel(
            name='Post',
        ),
    ]
