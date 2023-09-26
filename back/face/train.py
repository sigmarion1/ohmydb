from face.boto import s3_upload
from face.django_handler import DjangoHandler

import math
from sklearn import neighbors
import os
import os.path
import pickle
from PIL import Image, ImageDraw
import face_recognition
from face_recognition.face_recognition_cli import image_files_in_folder
import requests


HOST_URL = "https://img.ohmydb.com"
CURRENT_PATH = os.getcwd()
DOWNLOAD_PATH = f"{CURRENT_PATH}/face/temp"
S3_CLASSIFIER_UPLOAD_PATH = "classifier"
DH = DjangoHandler()

X = []
y = []


def train_queued_classifier():
    classifier = DH.get_queued_classifier()

    if not classifier:
        print("not queued classifier")
        return None

    training_image_dict = DH.get_training_image_dict(classifier.pk)

    for memeber, image_path_list in training_image_dict.items():
        for image_path in image_path_list:
            url = f"{HOST_URL}/{image_path}"

            image = face_recognition.load_image_file(requests.get(url, stream=True).raw)
            face_bounding_boxes = face_recognition.face_locations(image)

            if len(face_bounding_boxes) != 1:
                # If there are no people (or too many people) in a training image, skip the image.
                print(
                    "Image {} not suitable for training: {}".format(
                        image_path,
                        "Didn't find a face"
                        if len(face_bounding_boxes) < 1
                        else "Found more than one face",
                    )
                )
            else:
                # Add face encoding for current image to the training set
                X.append(
                    face_recognition.face_encodings(
                        image, known_face_locations=face_bounding_boxes
                    )[0]
                )
                y.append(memeber)

    if classifier.n_neighbors is None:
        classifier.n_neighbors = int(round(math.sqrt(len(X))))
        print("Chose n_neighbors automatically:", classifier.n_neighbors)

    knn_clf = neighbors.KNeighborsClassifier(
        n_neighbors=classifier.n_neighbors,
        algorithm=classifier.algorithm,
        weights="distance",
    )
    knn_clf.fit(X, y)

    save_path = f"{DOWNLOAD_PATH}/{classifier.pk}.clf"

    # Save the trained KNN classifier
    with open(save_path, "wb") as f:
        pickle.dump(knn_clf, f)

    s3_destination = f"{S3_CLASSIFIER_UPLOAD_PATH}/{classifier.pk}.clf"
    if s3_upload(save_path, s3_destination):
        classifier.training_status = classifier.TrainingStatus.CREATED
        classifier.name = (
            f"{classifier.name}_{classifier.n_neighbors}_{classifier.algorithm}"
        )
        classifier.url = s3_destination
        classifier.save()

    return


if __name__ == "__main__":
    train_queued_classifier()
