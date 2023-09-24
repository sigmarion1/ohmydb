from face.boto import s3


if __name__ == "__main__":
    response = s3.list_buckets()
    print(response)
