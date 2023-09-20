from django.http import HttpResponse
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend

from .serializer import ImageSerializer

from .models import Image

from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.response import Response
from rest_framework.filters import OrderingFilter


def index(request):
    return HttpResponse("Hello, world. You're at the images index.")


class HealthApiView(APIView):
    def get(self, request):
        return Response("OK")


class ImageModelViewset(ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ["annotation"]
    ordering_fields = ["id"]
    ordering = ["-id"]
