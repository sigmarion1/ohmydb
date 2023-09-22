from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import ImageModelViewset

router = DefaultRouter()

router.register(r"images", ImageModelViewset)

urlpatterns = router.urls
