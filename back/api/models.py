from django.db import models


class Image(models.Model):
    class Member(models.TextChoices):
        ARIN = "arin"
        MIMI = "mimi"
        YOOA = "yooa"
        YUBIN = "yubin"
        HYOJUNG = "hyojung"
        SEUNGHEE = "seunghee"
        UNKNOWN = "unknown"

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    url = models.CharField(max_length=255)
    thumbnail_url = models.CharField(max_length=255)
    annotation = models.CharField(
        max_length=50, choices=Member.choices, default=Member.UNKNOWN
    )

    class Meta:
        indexes = [models.Index(fields=["annotation"])]


class Classifier(models.Model):
    class TRAINING_STATUS(models.TextChoices):
        CREATED = "created"
        QUEUE = "queue"
        ERROR = "error"
        TRAINING = "training"

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    training_images = models.ManyToManyField(Image)
    trainging_status = models.CharField(max_length=50, default=TRAINING_STATUS.QUEUE)


class TestSet(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=255)
    test_images = models.ManyToManyField(Image)


class TestRecord(models.Model):
    class TEST_STATUS(models.TextChoices):
        QUEUE = "queue"
        ERROR = "error"
        TESTING = "testing"
        FINISH = "finish"

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tested_at = models.DateTimeField(null=True)
    test_set = models.ForeignKey(TestSet, on_delete=models.CASCADE)
    classifier = models.ForeignKey(Classifier, on_delete=models.CASCADE)
    test_status = models.CharField(
        max_length=50, choices=TEST_STATUS.choices, default=TEST_STATUS.QUEUE
    )


class TestImageResult(models.Model):
    class RESULT(models.TextChoices):
        WAIT = "wait"
        SUCCESS = "success"
        FAIL = "fail"

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    test_record = models.ForeignKey(TestSet, on_delete=models.CASCADE)
    expected_member = models.CharField(max_length=50, choices=Image.Member.choices)
    result_member = models.CharField(max_length=50, choices=Image.Member.choices)
    test_result = models.CharField(
        max_length=50, choices=RESULT.choices, default=RESULT.WAIT
    )
