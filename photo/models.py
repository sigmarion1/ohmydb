from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill


class Member(models.Model):
    name = models.CharField(max_length=100)
    name_eng = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Photo(models.Model):
    title = models.CharField(max_length=100)

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_photos')

    photo = models.ImageField(upload_to='photos/%Y/%m/%d')
    photo_thumbnail = ImageSpecField(
        source = 'photo',
        processors = [ResizeToFill(500, 500)],
        format = 'JPEG',
        options = {'quality': 80}
    )

    text = models.CharField(max_length=255, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    members = models.ManyToManyField(Member)


    def __str__(self):
        return self.author.username + " " + self.created.strftime("%Y-%m-%d %H:%M:%S")

    def get_absolute_url(self):
        return reverse('photo:photo_detail', args=[str(self.id)])

    class Meta:
        ordering = ['-updated']


class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_commets')
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, related_name='photo_comments')

    text = models.TextField(max_length=255)

    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.photo.text + self.author.username + self.text

    class Meta:
        ordering = ['updated']



