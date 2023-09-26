import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ohmydb.settings")
django.setup()

from typing import List
from api.models import Image, Classifier, ImageResult, TestRecord


class DjangoHandler:
    def __new__(cls, *args, **kwargs):
        instance = super().__new__(cls)
        return instance

    def insert_image_to_database(self, upload_files: List):
        Image.objects.create(url=upload_files[0], thumbnail_url=upload_files[1])

    def get_training_image_dict(self, classifier_id: int):
        result = {}

        classifier = Classifier.objects.filter(pk=classifier_id).first()

        if not classifier:
            return {}

        for image in classifier.training_images.all():
            if image.annotation == Image.Member.UNKNOWN:
                continue

            if image.annotation not in result:
                result[image.annotation] = []

            result[image.annotation].append(image.url)

        return result

    def get_queued_classifier(self):
        classifier = Classifier.objects.filter(
            training_status=Classifier.TrainingStatus.QUEUE
        ).first()

        return classifier

    def get_queued_test_record(self):
        test_record = TestRecord.objects.filter(
            test_status=TestRecord.TestStatus.QUEUE,
            classifier__training_status=Classifier.TrainingStatus.CREATED,
        ).first()

        return test_record

    def create_image_result(self, expected_member, result_member, image, test_record):
        ImageResult.objects.create(
            expected_member=expected_member,
            result_member=result_member,
            image=image,
            test_record=test_record,
        )
