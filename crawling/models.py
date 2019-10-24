from django.db import models

'''
    post to be crawled or checked
'''
class Post(models.Model):
    board = models.CharField(max_length=100)
    number = models.IntegerField()
    isChecked = models.BooleanField(default=False)
    checkResult = models.CharField(max_length=255, blank=True)
    
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

