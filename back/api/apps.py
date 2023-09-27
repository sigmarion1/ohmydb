from django.apps import AppConfig
from django.core import paginator
from rest_framework import pagination


class ApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api"
