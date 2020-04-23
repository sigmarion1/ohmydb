#from recog import get_face_name
from thumbnail import make_thumbnail
from recog import get_face_name
from db import insert




def work():
    images = make_thumbnail()

    for image in images:
        who = get_face_name(image[1])
        print(who)
        print(image[1])
        #who = get_face_name(image[1])


















if __name__ == "__main__":
    work()
