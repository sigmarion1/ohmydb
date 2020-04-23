import os
from PIL import Image

SIZE = (500, 500)
PATH_ORI = os.path.join('image_crawl', 'ori')
PATH_THM = os.path.join('image_crawl', 'thm')

 
if not os.path.exists(PATH_THM):
    os.makedirs(PATH_THM)

def make_thumbnail():

    results = []

    files = [f for f in os.listdir(PATH_ORI) if os.path.isfile(os.path.join(PATH_ORI,  f))]

    for file in files:
        img_path = os.path.join(PATH_ORI, file)
        thm_path = os.path.join(PATH_THM, 'th_' + file)

        img = Image.open(img_path)
        img.thumbnail(SIZE)
        img.save(thm_path)
        
        if not os.path.exists(PATH_THM):
            os.makedirs(PATH_THM)

        results.append((img_path, thm_path))
    
    print('thumnail maked : ' + str(len(results)))
    return results
    

#     os.



# image_temp_path = os.path.join(os.pardir, os.pardir, 'images-temp')

# im = Image.open((os.path.join(image_temp_path, '1.jpg')))
# im.thumbnail(thumbnail_size)

# im.save((os.path.join(image_temp_path, '1-thumb.jpg')))



if __name__ == '__main__':
    make_thumbnail()
