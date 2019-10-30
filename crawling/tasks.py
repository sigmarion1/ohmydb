# Create your tasks here
from __future__ import absolute_import, unicode_literals
from celery import shared_task
from .crawling import Crawler


@shared_task
def add(x, y):
    return x + y


@shared_task
def mul(x, y):
    return x * y


@shared_task
def xsum(numbers):
    return sum(numbers)

@shared_task
def print_log(log=None):
    if log:
        print(log)
        return log
    else:
        print("logging")
        return "logging"

@shared_task
def crawl_task(asc):
    c = Crawler()
    return(c.save_a_photo_from_list())