# Generated by Django 5.1.5 on 2025-02-05 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_estudiante_usuario'),
    ]

    operations = [
        migrations.AddField(
            model_name='estudiante',
            name='aldia',
            field=models.BooleanField(default=False),
        ),
    ]
