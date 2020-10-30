# Generated by Django 3.0.5 on 2020-10-30 02:06

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(blank=True, max_length=50, null=True)),
                ('product_type', models.CharField(blank=True, max_length=50, null=True)),
                ('price', models.CharField(blank=True, max_length=50, null=True)),
                ('product_description', models.CharField(blank=True, max_length=20000, null=True)),
                ('exact_date', models.DateTimeField(blank=True, default=datetime.datetime.now)),
            ],
        ),
    ]
