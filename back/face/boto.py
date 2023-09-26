import os
import boto3
from dotenv import load_dotenv
from botocore.exceptions import ClientError

BUCKET_NAME = "ohmydb-bucket-1"


load_dotenv()


s3_client = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name="ap-northeast-2",
)


def s3_upload(source: str, destination: str) -> bool:
    try:
        s3_client.upload_file(source, BUCKET_NAME, destination)
    except ClientError as e:
        print(e)
        return False
    return True


def s3_download(key: str, destination: str) -> bool:
    try:
        s3_client.download_file(Bucket=BUCKET_NAME, Key=key, Filename=destination)
    except ClientError as e:
        print(e)
        return False
    return True


def s3_delete(key: str) -> bool:
    try:
        s3_client.delete_object(Bucket=BUCKET_NAME, Key=key)
    except ClientError as e:
        print(e)
        return False
    return True
