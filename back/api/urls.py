from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import ImageModelViewset

router = DefaultRouter(trailing_slash=True)

router.register(r"images", ImageModelViewset)

urlpatterns = router.urls
