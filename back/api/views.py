from django.http import HttpResponse
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend

from .filters import MultiIdFilter

from .serializer import (
    ClassifierSerializer,
    ImageSerializer,
    TestRecordImageResultSerializer,
    TestRecordSerializer,
    TestSetSerializer,
)

from .models import Classifier, Image, TestRecordImageResult, TestRecord, TestSet

from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.filters import OrderingFilter


class HealthApiView(APIView):
    def get(self, request):
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


class TestRecordImageResultModelViewset(ModelViewSet):
    queryset = TestRecordImageResult.objects.select_related("image")
    serializer_class = TestRecordImageResultSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ["test_record"]
    ordering_fields = ["id"]
    ordering = ["-id"]
