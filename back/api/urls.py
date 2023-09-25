from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import (
    ClassifierModelViewset,
    ImageModelViewset,
    ImageResultModelViewSet,
    TestRecordModelViewset,
    TestSetModelViewset,
)

router = DefaultRouter(trailing_slash=False)

router.register(r"images", ImageModelViewset)
router.register(r"classifiers", ClassifierModelViewset)
router.register(r"test-sets", TestSetModelViewset)
router.register(r"test-records", TestRecordModelViewset)
router.register(r"image-results", ImageResultModelViewSet)


urlpatterns = router.urls
