from face.boto import s3_download
from face.django_handler import DjangoHandler

from datetime import datetime
import os
import os.path
import pickle
import face_recognition
from face_recognition.face_recognition_cli import image_files_in_folder
import requests


HOST_URL = "https://img.ohmydb.com"
CURRENT_PATH = os.getcwd()
DOWNLOAD_PATH = f"{CURRENT_PATH}/face/download"
S3_CLASSIFIER_UPLOAD_PATH = "classifier"
DH = DjangoHandler()

DISTANCE_THRESHOLD = 0.6


def test_classifier_by_record():
    test_record = DH.get_queued_test_record()

    if not test_record:
        print("not queued test record")
        return None

    classifier = test_record.classifier
    test_set = test_record.test_set

    classifier_path = f"{DOWNLOAD_PATH}/{classifier.pk}.clf"

    s3_download(classifier.url, classifier_path)

    with open(classifier_path, "rb") as f:
        knn_clf = pickle.load(f)

    success_count = 0
    fail_count = 0

    for test_image in test_set.test_images.all():
        url = f"{HOST_URL}/{test_image.url}"
        image = face_recognition.load_image_file(requests.get(url, stream=True).raw)
        face_locations = face_recognition.face_locations(image)
        result_member = test_image.Member.UNKNOWN

        if len(face_locations) == 1:
            face_encodings = face_recognition.face_encodings(
                image, known_face_locations=face_locations
            )

            result_member = knn_clf.predict(face_encodings)[0]

        if (
            result_member != test_image.Member.UNKNOWN
            and result_member == test_image.annotation
        ):
            success_count += 1
        else:
            fail_count += 1

        DH.create_image_result(
            test_image.annotation, result_member, test_image, test_record
        )

    test_record.test_status = test_record.TestStatus.FINISH
    test_record.tested_at = datetime.now()
    test_record.answer_rate = 100 * success_count / (success_count + fail_count)
    test_record.save()

    print(
        f"Test Complete. Image : {success_count + fail_count}, Success : {success_count}"
    )


if __name__ == "__main__":
    test_classifier_by_record()
