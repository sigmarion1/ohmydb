import os
from face.boto import s3_client
from botocore.exceptions import ClientError
import re
import uuid
from typing import List, Optional, Tuple

from datetime import datetime

from PIL import Image, UnidentifiedImageError

from face.django_handler import DjangoHandler

BUCKET_NAME = "ohmydb-bucket-1"
S3_IMAGE_TEMP_PATH = "temp"
S3_IMAGE_UPLOAD_PATH = "image"
CURRENT_PATH = os.getcwd()
DOWNLOAD_PATH = f"{CURRENT_PATH}/face/temp"
UPLOAD_PATH = f"{CURRENT_PATH}/face/upload"
MAXIMUM_SIZE = (2000, 2000)
THUMBNAIL_SIZE = (200, 200)

DH = DjangoHandler()


def download_temp_image():
    response = s3_client.list_objects_v2(
        Bucket=BUCKET_NAME, Prefix=f"{S3_IMAGE_TEMP_PATH}/"
    )

    file_list = response["Contents"]

    for file in file_list:
        key = file["Key"]

        if key == f"{S3_IMAGE_TEMP_PATH}/":
            continue

        file_name = key.split("/")[-1]

        s3_client.download_file(
            Bucket=BUCKET_NAME, Key=key, Filename=f"{DOWNLOAD_PATH}/{file_name}"
        )


def add_thumbnail_image(original_image: str) -> Tuple[str, str] | None:
    try:
        image_uuid = uuid.uuid4()
        image_file, thumbnail_file = f"{image_uuid}.jpg", f"{image_uuid}_thumbnail.jpg"

        image = Image.open(original_image)
        image.thumbnail(MAXIMUM_SIZE)
        image.save(f"{UPLOAD_PATH}/{image_file}", "jpeg")

        image.thumbnail(THUMBNAIL_SIZE)
        image.save(f"{UPLOAD_PATH}/{thumbnail_file}", "jpeg")

        return (image_file, thumbnail_file)

    except (UnidentifiedImageError, FileNotFoundError) as e:
        print(f"{e} : {original_image}, ")
        return None


def upload_process():
    for original_image in image_files_in_folder(DOWNLOAD_PATH):
        image_files = add_thumbnail_image(original_image)

        if not image_files:
            continue

        upload_files = upload_images_to_s3(image_files)

        if not upload_files:
            continue

        DH.insert_image_to_database(upload_files)


def upload_images_to_s3(image_files: Tuple[str, str]) -> List:
    upload_files = []

    for image in image_files:
        date = datetime.now().strftime("%Y-%m-%d")
        source = f"{UPLOAD_PATH}/{image}"
        destination = f"{S3_IMAGE_UPLOAD_PATH}/{date}/{image}"

        try:
            s3_client.upload_file(source, BUCKET_NAME, destination)
        except ClientError as e:
            print(e)
            return []

        upload_files.append(destination)

    return upload_files


def image_files_in_folder(folder):
    return [
        os.path.join(folder, f)
        for f in os.listdir(folder)
        if re.match(r".*\.(jpg|jpeg|png|webp)", f, flags=re.I)
    ]


if __name__ == "__main__":
    download_temp_image()
    upload_process()
