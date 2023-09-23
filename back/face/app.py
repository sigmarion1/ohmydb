import os
import django


from api.models import Image


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ohmydb.settings")
django.setup()

a = Image.objects.all()
print(a)
