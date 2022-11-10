# Generated by Django 4.1.1 on 2022-11-09 06:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=128, null=True)),
                ('cover', models.ImageField(upload_to='music/covers/', blank=True, null=True)),
                ('year', models.PositiveSmallIntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=128, null=True)),
                ('photo', models.ImageField(upload_to='music/artist_photos/', blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Music',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=128, null=True)),
                ('file', models.FileField(upload_to='music/files/')),
                ('album', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='music.album')),
                ('artist', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='music.artist')),
            ],
        ),
        migrations.AddConstraint(
            model_name='album',
            constraint=models.CheckConstraint(check=models.Q(('year__gte', 1900)), name='year_gte_1900'),
        ),
        migrations.AddConstraint(
            model_name='album',
            constraint=models.CheckConstraint(check=models.Q(('year__lte', 2022)), name='year_lte_2022'),
        ),
    ]

