# Generated by Django 5.1.5 on 2025-02-04 21:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_cinturon_entidadpromotorasalud_profesion'),
    ]

    operations = [
        migrations.CreateModel(
            name='Kwan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
            ],
        ),
    ]
