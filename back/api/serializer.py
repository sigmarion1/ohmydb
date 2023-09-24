from rest_framework import serializers

from .models import Classifier, Image, TestSet

CLASSIFIER_PREVIEW_IMAGE_COUNT = 5


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
        fields = ["id", "name", "test_status"]
