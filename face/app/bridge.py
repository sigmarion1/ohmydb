#from recog import get_face_name
from thumbnail import make_thumbnail, save_image
from recog import get_face_name
from db import insert
import time


OMG_MEMBER = {'group': '단체', 'hyojung': '효정', 'mimi': '미미', 'yooa': '유아', 'seunghee': '승희', 'jiho': '지호', 'binnie': '비니', 'arin': '아린'}

def work():
    images = make_thumbnail()

    for image in images:

        image_ori = image[0]
        image_thm = image[1]

        who = []
        who_eng = get_face_name(image_thm)

        no = image_thm.split('_')[-2]
        
        
        if not who_eng:
            continue

        else:
            for member in who_eng:
                who.append(OMG_MEMBER[member])

        
        group = image_thm.split('_')[-3]

        save_image(image, group)

        insert(group, no, who, 'default', image_ori, image_thm)

        print(who)
        print(group + str(no) + ' image saved')



    
    

if __name__ == '__main__':

    while(True):
        work()
        time.sleep(60)











if __name__ == "__main__":
    work()
