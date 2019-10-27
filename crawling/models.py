from django.db import models
from datetime import datetime

'''
    post to be crawled or checked
'''
class Post(models.Model):
    board = models.CharField(max_length=255)
    number = models.IntegerField()
    name = models.CharField(max_length=255, blank=True)
    originalCreated = models.DateTimeField(default=datetime.now)

    isChecked = models.BooleanField(default=False)
    checkResult = models.CharField(max_length=255, blank=True)
    
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

