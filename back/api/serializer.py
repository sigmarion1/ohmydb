from rest_framework import serializers

from .models import Classifier, Image, TestImageResult, TestRecord, TestSet


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ["id", "url", "thumbnail_url", "annotation"]


class ClassifierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classifier
        fields = ["id", "name", "url", "training_images", "trainging_status"]


class TestSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestSet
        fields = ["id", "name", "test_images"]


class TestRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestRecord
        fields = ["id", "tested_at", "test_set", "classifier", "test_status"]


class TestImageResultSerializer(serializers.ModelSerializer):
    image = ImageSerializer(read_only=True)

    class Meta:
        model = TestImageResult
        fields = ["id", "image", "expected_member", "result_member"]
