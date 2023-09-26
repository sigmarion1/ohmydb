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

DH = DjangoHandler()


def train_queued_classifier():
    classifier_id = DH.get_queued_classifier()

    if not classifier_id:
        return

    training_image_dict = DH.get_training_image_dict(classifier_id)

    for memeber, image_list in training_image_dict:
        for image in image_list:
            print(face_recognition.load_image_file(image))

    print(training_image_dict)


# {'mimi': ['https://picsum.photos/seed/picsum/300/200', 'https://picsum.photos/seed/picsum/300/200'], 'yubin': ['https://picsum.photos/seed/picsum/300/200'], 'seunghee': ['https://picsum.photos/seed/picsum/300/200']}


if __name__ == "__main__":
    train_queued_classifier()
