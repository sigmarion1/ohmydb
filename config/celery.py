from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedule import crontab

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

app = Celery('config')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))

'''
app.conf.beat_schedule = {
    'add-every-30-seconds': {
        'task': 'crawling.tasks.print_log',
        'schedule': 1.0,
        'args': None,
    },
}

'''
app.conf.beat_schedule = {
    'crawling': {
        'task': 'crawling.tasks.crawl_task',
        'schedule': crontab(minute='*/43', hour='*/3,8-17')
        'args': None,
    },

    'listing': {
        'task': 'crawling.tasks.list_omg_task',
        'schedule': crontab(minute-'*/55', hour='10-15')
        'args': None,
    },
}
