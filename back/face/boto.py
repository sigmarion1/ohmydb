import os
import boto3
from dotenv import load_dotenv


load_dotenv()


s3_client = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name="ap-northeast-2",
)

# session = boto3.Session(
#     aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
#     aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
# )

# s3 = session.resource("s3")

# ohmydb_bucket = s3.Bucket(BUCKET_NAME)
