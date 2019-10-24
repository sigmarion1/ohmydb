from django.shortcuts import render
from django.http import HttpResponse
from .crawling import Crawler

def CrawlingView(request, post):

    c = Crawler()
    boardID = "ohmygirl"
    return HttpResponse(c.get_Image_DC(boardID, post))


def CPostView(request, page):

    c = Crawler()
    boardID = "ohmygirl"
    result = c.get_recommend_post(boardID, page)
    
    return HttpResponse(c.save_post_list(boardID, result))

        