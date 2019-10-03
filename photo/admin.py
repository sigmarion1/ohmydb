from django.contrib import admin

from .models import *


class PhotoAdmin(admin.ModelAdmin):
    list_display = ['id', 'author', 'created', 'updated']
    raw_id_fields = ['author']
    list_filter = ['created', 'updated', 'author']
    search_fields = ['text', 'created']
    ordering = ['-updated', '-created']


admin.site.register(Photo, PhotoAdmin)
admin.site.register(Comment)
admin.site.register(Hashtag)