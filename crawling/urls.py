from django.urls import path
from .views import CrawlingView, CPostView

app_name = 'c'

urlpatterns = [
    path('crawl/<int:post>', CrawlingView, name='crawling_view'),
    path('list/<int:page>', CPostView , name='cpost_view'),
    
]