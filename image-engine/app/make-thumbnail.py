import os
from PIL import Image

thumbnail_size = (400, 400)


image_temp_path = os.path.join(os.pardir, os.pardir, 'images-temp')

im = Image.open((os.path.join(image_temp_path, '1.jpg')))
im.thumbnail(thumbnail_size)

im.save((os.path.join(image_temp_path, '1-thumb.jpg')))
