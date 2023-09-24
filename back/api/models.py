from django.db import models


class CommonModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Image(CommonModel):
    class Member(models.TextChoices):
        ARIN = "arin"
        MIMI = "mimi"
        YOOA = "yooa"
        YUBIN = "yubin"
        HYOJUNG = "hyojung"
        SEUNGHEE = "seunghee"
        UNKNOWN = "unknown"

    url = models.CharField(max_length=255)
    thumbnail_url = models.CharField(max_length=255)
    annotation = models.CharField(
        max_length=50, choices=Member.choices, default=Member.UNKNOWN
    )

    class Meta:
        indexes = [models.Index(fields=["annotation"])]
        db_table = "image"


class Classifier(CommonModel):
    class TRAINING_STATUS(models.TextChoices):
        QUEUE = "queue"
        TRAINING = "training"
        ERROR = "error"
        CREATED = "created"

    name = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    training_images = models.ManyToManyField(Image)
    trainging_status = models.CharField(max_length=50, default=TRAINING_STATUS.QUEUE)

    class Meta:
        db_table = "classifier"


class TestSet(CommonModel):
    name = models.CharField(max_length=255)
    test_images = models.ManyToManyField(Image)

    class Meta:
        db_table = "test_set"


class TestRecord(CommonModel):
    class TEST_STATUS(models.TextChoices):
        QUEUE = "queue"
        TESTING = "testing"
        ERROR = "error"
        FINISH = "finish"

    tested_at = models.DateTimeField(null=True)
    test_set = models.ForeignKey(TestSet, on_delete=models.CASCADE)
    classifier = models.ForeignKey(Classifier, on_delete=models.CASCADE)
    test_status = models.CharField(
        max_length=50, choices=TEST_STATUS.choices, default=TEST_STATUS.QUEUE
    )

    class Meta:
        db_table = "test_record"


class TestRecordImageResult(CommonModel):
    test_record = models.ForeignKey(TestRecord, on_delete=models.CASCADE)
    image = models.ForeignKey(Image, on_delete=models.CASCADE)
    expected_member = models.CharField(max_length=50, choices=Image.Member.choices)
    result_member = models.CharField(max_length=50, choices=Image.Member.choices)

    class Meta:
        indexes = [models.Index(fields=["test_record"])]
        db_table = "test_record_image_result"
