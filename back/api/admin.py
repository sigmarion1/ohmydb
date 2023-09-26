from django.contrib import admin
from api.models import Image, Classifier, TestSet, TestRecord, ImageResult


admin.site.register(Image)
admin.site.register(Classifier)
admin.site.register(TestSet)
admin.site.register(TestRecord)
admin.site.register(ImageResult)
