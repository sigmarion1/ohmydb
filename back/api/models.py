from django.db import models


class Image(models.Model):
    MEMBER_CHOICES = [
        ("arin", "Arin"),
        ("mimi", "Mimi"),
        ("yooa", "Yooa"),
        ("yubin", "Yubin"),
        ("hyojung", "Hyojung"),
        ("seunghee", "Seunghee"),
        ("unknown", "Unknown"),
    ]
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image_url = models.CharField(max_length=255)
    thumbnail_url = models.CharField(max_length=255)
    annotation = models.CharField(max_length=50, default="unknown")

    class Meta:
        indexes = [models.Index(fields=["annotation"])]
