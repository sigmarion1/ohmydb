import os
from datetime import date
from PIL import Image
from shutil import copyfile


SIZE = (600, 600)
PATH_ORI = os.path.join('image_crawl', 'ori')
PATH_THM = os.path.join('image_crawl', 'thm')

DB_PATH_ORI = os.path.join('image_db', 'ori')
DB_PATH_THM = os.path.join('image_db', 'thm')
 



def make_thumbnail():

    if not os.path.exists(PATH_THM):
        os.makedirs(PATH_THM)

    if not os.path.exists(PATH_ORI):
        os.makedirs(PATH_ORI)



    results = []

    files = [f for f in os.listdir(PATH_ORI) if os.path.isfile(os.path.join(PATH_ORI,  f))]

    for file in files:
        img_path = os.path.join(PATH_ORI, file)
        thm_path = os.path.join(PATH_THM, 'th_' + file.split('.')[-2] + '.jpg')

        img = Image.open(img_path)
        img.thumbnail(SIZE)
        img.convert('RGB').save(thm_path)
        
        if not os.path.exists(PATH_THM):
            os.makedirs(PATH_THM)


        results.append((img_path, thm_path))
    
    print('thumnail maked : ' + str(len(results)))
    return results
    
def save_image(image, group):

    if image is None:
        print('save Image : image is None')
        return None

    image_ori = image[0]
    image_thm = image[1]

    db_image_ori_dir = os.path.join('image_db', group, date.today().isoformat(), 'ori')
    db_image_thm_dir = os.path.join('image_db', group, date.today().isoformat(), 'thm')

    if not os.path.exists(db_image_ori_dir):
        os.makedirs(db_image_ori_dir)

    if not os.path.exists(db_image_thm_dir):
        os.makedirs(db_image_thm_dir)

    db_image_ori = os.path.join(db_image_ori_dir, os.path.basename(image_ori))
    db_image_thm = os.path.join(db_image_thm_dir, os.path.basename(image_thm))

    copyfile(image_ori, db_image_ori)
    copyfile(image_thm, db_image_thm)

    return (db_image_ori, db_image_thm)
    

def clean(images):
    for image in images:
        os.remove(image[0])
        os.remove(image[1])

    



#     os.



# image_temp_path = os.path.join(os.pardir, os.pardir, 'images-temp')

# im = Image.open((os.path.join(image_temp_path, '1.jpg')))
# im.thumbnail(thumbnail_size)

# im.save((os.path.join(image_temp_path, '1-thumb.jpg')))



if __name__ == '__main__':
    make_thumbnail()
