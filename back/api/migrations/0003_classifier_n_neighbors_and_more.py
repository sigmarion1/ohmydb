# Generated by Django 4.2.5 on 2023-09-26 06:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_classifier_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='classifier',
            name='n_neighbors',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='classifier',
            name='training_images',
            field=models.ManyToManyField(blank=True, to='api.image'),
        ),
        migrations.AlterField(
            model_name='classifier',
            name='url',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
