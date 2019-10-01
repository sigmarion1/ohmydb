from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User

class Photo(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_photos')

    photo = models.ImageField(upload_to='photos/%Y/%m/%d', default='photos/no_image.png')

    text = models.TextField()

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.author.username + " " + self.created.strftime("%Y-%m-%d %H:%M:%S")

    def get_absolute_url(self):
        return reverse('photo:photo_detail', args=[str(self.id)])

    class Meta:
        ordering = ['-updated']

class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_commets')
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, related_name='photo_comments')

    text = models.TextField(max_length=100)

    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.photo.text + self.author.username + self.text

    class Meta:
        ordering = ['-updated']
