# Generated by Django 2.2 on 2019-05-19 12:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lesson', '0003_auto_20190519_1129'),
    ]

    operations = [
        migrations.AddField(
            model_name='contents',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
