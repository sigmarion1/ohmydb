from rest_framework import serializers

from .models import Classifier, Image, ImageResult, TestRecord, TestSet


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
        fields = [
            "id",
            "name",
            "url",
            "n_neighbors",
            "training_image_ids",
            "training_status",
            "algorithm",
        ]


class TestSetSerializer(serializers.ModelSerializer):
    test_image_ids = serializers.PrimaryKeyRelatedField(
        queryset=Image.objects.all(), many=True, source="test_images"
    )
    preview_image_urls = serializers.SerializerMethodField()

    class Meta:
        model = TestSet
        fields = ["id", "name", "test_image_ids", "preview_image_urls"]

    def get_preview_image_urls(self, test_set):
        return test_set.test_images.all()[:5].values_list("thumbnail_url", flat=True)


class TestRecordSerializer(serializers.ModelSerializer):
    test_set_id = serializers.PrimaryKeyRelatedField(
        queryset=TestSet.objects.all(), source="test_set"
    )
    classifier_id = serializers.PrimaryKeyRelatedField(
        queryset=Classifier.objects.all(), source="classifier"
    )

    class Meta:
        model = TestRecord
        fields = [
            "id",
            "tested_at",
            "test_set_id",
            "classifier_id",
            "test_status",
            "answer_rate",
        ]


class ImageResultSerializer(serializers.ModelSerializer):
    image = ImageSerializer()
    test_record_id = serializers.PrimaryKeyRelatedField(
        queryset=TestRecord.objects.all(), source="test_record"
    )

    class Meta:
        model = ImageResult
        fields = [
            "id",
            "image",
            "test_record_id",
            "expected_member",
            "result_member",
        ]
