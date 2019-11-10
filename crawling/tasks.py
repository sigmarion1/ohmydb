# Create your tasks here
from __future__ import absolute_import, unicode_literals
from celery import shared_task
from .crawling import Crawler
import random


@shared_task
def add(x, y):
    return x + y

@shared_task
def print_log(log=None):
    if log:
        print(log)
        return log
    else:
        print("logging")
        return "logging"

@shared_task
def crawl_task():
    c = Crawler()
    return(c.save_a_photo_from_list())

@shared_task
def list_omg_task():
    c = Crawler()
    board = "ohmygirl"
    page = random.randrange(1,10)
    post_list = c.get_recommend_post(board, page)
    result = c.save_post_list(post_list)
    return(result)