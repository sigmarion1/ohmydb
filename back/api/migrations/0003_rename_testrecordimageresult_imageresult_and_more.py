# Generated by Django 4.2.5 on 2023-09-25 09:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_classifier_algorithm_testrecord_answer_rate_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='TestRecordImageResult',
            new_name='ImageResult',
        ),
        migrations.RenameIndex(
            model_name='imageresult',
            new_name='image_resul_test_re_fb1b98_idx',
            old_name='test_record_test_re_8968b7_idx',
        ),
        migrations.AlterModelTable(
            name='imageresult',
            table='image_result',
        ),
    ]
