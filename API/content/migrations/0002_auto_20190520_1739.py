# Generated by Django 2.2 on 2019-05-20 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='content',
            name='text',
            field=models.CharField(blank=True, max_length=1024),
        ),
    ]
