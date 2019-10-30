from django.urls import path
from .views import CrawlingView, CPostView, crawl_from_list, celery_test

app_name = 'c'

urlpatterns = [
    path('crawl/<int:post>', CrawlingView, name='crawling_view'),
    path('list/<int:page>', CPostView , name='cpost_view'),
    path('c', crawl_from_list, name='crawl_from_list'),
    path('d', celery_test, name='celery_test'),
]