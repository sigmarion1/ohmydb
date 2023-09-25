from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.decorators import action

from .filters import MultiIdFilter

from .serializer import (
    ClassifierSerializer,
    ImageSerializer,
    ImageResultSerializer,
    TestRecordSerializer,
    TestSetSerializer,
)

from .models import Classifier, Image, ImageResult, TestRecord, TestSet

from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.filters import OrderingFilter


class HealthApiView(APIView):
    def get(self):
        return Response("OK")


class ImageModelViewset(ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter, MultiIdFilter]
    filterset_fields = ["annotation"]
    ordering_fields = ["id"]
    ordering = ["-id"]


class ClassifierModelViewset(ModelViewSet):
    queryset = Classifier.objects.all()
    serializer_class = ClassifierSerializer
    filter_backends = [OrderingFilter]
    ordering_fields = ["id"]
    ordering = ["-id"]


class TestSetModelViewset(ModelViewSet):
    queryset = TestSet.objects.all()
    serializer_class = TestSetSerializer
    filter_backends = [OrderingFilter]
    ordering_fields = ["id"]
    ordering = ["-id"]


class TestRecordModelViewset(ModelViewSet):
    queryset = TestRecord.objects.all()
    serializer_class = TestRecordSerializer
    filter_backends = [OrderingFilter]
    ordering_fields = ["id"]
    ordering = ["-id"]


class ImageResultModelViewSet(ModelViewSet):
    queryset = ImageResult.objects.select_related("image")
    serializer_class = ImageResultSerializer
    filter_backends = [OrderingFilter, DjangoFilterBackend]
    filterset_fields = ["test_record_id"]
    ordering_fields = ["id"]
    ordering = ["-id"]
