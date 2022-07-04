# Generated by Django 4.0.5 on 2022-06-29 00:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Dublinbusapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='WeatherData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField()),
                ('temperatue', models.DecimalField(decimal_places=2, max_digits=12)),
                ('description', models.CharField(max_length=150)),
            ],
        ),
    ]