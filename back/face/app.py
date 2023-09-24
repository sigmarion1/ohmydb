import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ohmydb.settings")
django.setup()

from api.models import Image

a = Image.objects.all()
print(a)

# /ohmydb/back python -m face.app
