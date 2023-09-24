from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import ClassifierModelViewset, ImageModelViewset, TestSetModelViewset

router = DefaultRouter(trailing_slash=False)

router.register(r"images", ImageModelViewset)
router.register(r"classifiers", ClassifierModelViewset)
router.register(r"testsets", TestSetModelViewset)


urlpatterns = router.urls
