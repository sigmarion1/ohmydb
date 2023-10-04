import time

from face.image_upload import upload_process
from face.train import train_queued_classifier
from face.classifier_test import test_classifier_by_record

if __name__ == "__main__":
    while True:
        upload_process()
        train_queued_classifier()
        test_classifier_by_record()

        time.sleep(60)
