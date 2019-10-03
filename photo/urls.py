from django.urls import path
from django.views.generic.detail import DetailView

from .views import *
from .models import Photo

app_name = 'photo'

urlpatterns = [
    path('', PhotoListView.as_view(), name='photo_list'),
    path('detail/<int:pk>/', DetailView.as_view(model=Photo, template_name='photo/detail.html'), name='photo_detail'),
    path('upload/', PhotoUploadView.as_view(), name='photo_upload'),
    path('delete/<int:pk>/', PhotoDeleteView.as_view(), name='photo_delete'),
    path('update/<int:pk>', PhotoUpdateView.as_view(), name='photo_update'),
]