import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ohmydb.settings")
django.setup()

from api.models import Image

S3_URL_PREFIX = "https://img.ohmydb.com"


a = Image.objects.all()


def get_image_urls(image_ids: list[int]) -> list[str]:
    image_urls = Image.objects.filter(pk__in=image_ids).values_list(
        "image_url", flat=True
    )

    return [S3_URL_PREFIX + x for x in image_urls if x]


if __name__ == "__main__":
    print(get_image_urls([1, 2, 3]))
