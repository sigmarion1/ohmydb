from .boto import s3
from pathlib import Path


if __name__ == "__main__":
    print(Path(__file__).absolute())
    response = s3.list_buckets()
    print(response)
