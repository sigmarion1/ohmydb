from rest_framework import serializers

from .models import Classifier, Image, TestRecordImageResult, TestRecord, TestSet


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ["id", "url", "thumbnail_url", "annotation"]


class ClassifierSerializer(serializers.ModelSerializer):
    training_image_ids = serializers.PrimaryKeyRelatedField(
        queryset=Image.objects.all(), many=True, source="training_images"
    )

    class Meta:
        model = Classifier
        fields = ["id", "name", "url", "training_image_ids", "trainging_status"]


class TestSetSerializer(serializers.ModelSerializer):
    test_image_ids = serializers.PrimaryKeyRelatedField(
        queryset=Image.objects.all(), many=True, source="test_images"
    )

    class Meta:
        model = TestSet
        fields = ["id", "name", "test_image_ids"]


class TestRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestRecord
        fields = ["id", "tested_at", "test_set", "classifier", "test_status"]


class TestRecordImageResultSerializer(serializers.ModelSerializer):
    image_url = serializers.CharField(source="image.thumbnail_url", read_only=True)

    class Meta:
        model = TestRecordImageResult
        fields = [
            "id",
            "image",
            "image_url",
            "test_record",
            "expected_member",
            "result_member",
        ]
