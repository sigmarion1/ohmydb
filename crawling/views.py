from django.shortcuts import render
from django.http import HttpResponse
from .crawling import Crawler
from .tasks import print_log, crawl_task, list_omg_task

def CrawlingView(request, post):

    c = Crawler()
    boardID = "ohmygirl"
    return HttpResponse(c.get_Image_DC(boardID, post))


def CPostView(request, page):

    c = Crawler()
    boardID = "ohmygirl"
    result = c.get_recommend_post(boardID, page)
    
    return HttpResponse(c.save_post_list(result))

def crawl_from_list(request):
    c = Crawler()

    return HttpResponse(c.save_a_photo_from_list())

def celery_test(request):
    crawl_task.delay(1)
    return HttpResponse('ok')

def list_omg_test(request):
    list_omg_task.delay(1)
    return HttpResponse('ok')
    
        