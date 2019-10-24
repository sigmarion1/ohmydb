import re
import requests
import urllib
import hashlib
import imagehash
import os

from PIL import Image, ImageDraw, ImageFont
from bs4 import BeautifulSoup

from django.core.files import File
from django.contrib.auth.models import User

from .face import get_face_name
from .models import Post
from photo.models import Photo

TEMPORARY_PHOTO = "temp_photo"
ALLOWED_EXTENSIONS = ('png', 'jpg', 'jpeg')
OMG_MEMBER = {'all': '단체', 'hyojung': '효정', 'mimi': '미미', 'yooa': '유아',
              'seunghee': '승희', 'jiho': '지호', 'binnie': '비니', 'arin': '아린'}


class Crawler():

    def __init__(self):
        if not os.path.exists(TEMPORARY_PHOTO):
            os.makedirs(TEMPORARY_PHOTO)

    def get_Image_DC(self, boardID, postNum):

        headers = {'Content-Type': 'application/json; charset=utf-8',
                   "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/74.0.3729.169 Chrome/74.0.3729.169 Safari/537.36"}

        URL = "https://gall.dcinside.com/board/view"
        params = {'id': boardID, 'no': postNum}
        req = requests.get(URL, params=params, headers=headers)
        soup = BeautifulSoup(req.text, 'html.parser')

        div_class = soup.find("div", class_="writing_view_box")

        if div_class is None:
            return "no page"

        img_class = div_class.find_all("img")
        img_num = 0
        img_hash_list = []

        headers = {'Referer': req.url,
                   "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/74.0.3729.169 Chrome/74.0.3729.169 Safari/537.36"}

        for img_tag in img_class:
            img_url = img_tag.get('src')
            img_req = requests.get(img_url, headers=headers)

            if img_req is None or img_req.status_code != 200:
                continue

            print(img_req)

            if img_req.headers.get('Content-Disposition') is None:
                continue

            img_ext = img_req.headers.get(
                'Content-Disposition').split(".")[-1]
            img_name = str(boardID) + '_' + str(postNum) + \
                '_' + str(img_num) + '.' + str(img_ext)

            with open(img_name, 'wb') as f:
                f.write(img_req.content)

            img_hash = imagehash.average_hash(Image.open(img_name))
            if img_hash in img_hash_list:
                os.remove(img_name)
                continue
            else:
                img_hash_list.append(img_hash)

            if img_ext == "gif":
                image_get_face = self.gif2png(img_name)
            elif img_ext in ALLOWED_EXTENSIONS:
                image_get_face = img_name
            else:
                continue

            name_list = get_face_name(image_get_face)
            print(name_list)

            if len(name_list) > 1:
                self.saveImage(['all'], img_name)

            elif len(name_list) == 1:
                self.saveImage(name_list, img_name)

            else:
                continue

            if os.path.exists(image_get_face):
                os.remove(image_get_face)

            if os.path.exists(img_name):
                os.remove(img_name)

            img_num += 1

        if img_num == 0:
            return "no image"

        else:
            return str(img_num) + " images downloaded"

    def gif2png(self, gif):
        img = Image.open(gif)
        png_img = gif+".png"
        img.save(png_img, 'PNG')

        return png_img

    def saveImage(self, name, image):
        with open(image, 'rb') as f:
            wrapped_file = File(f)
            title = OMG_MEMBER[name[0]]
            author = User.objects.get(id=1)

            p = Photo(title=title, author=author, photo=wrapped_file)
            p.save()

    def get_recommend_post(self, boardID, page):

        result = []

        URL = "https://gall.dcinside.com/board/lists"
        params = {
            'id': boardID,
            'page': page,
            'exception_mode': 'recommend',
        }
        headers = {'Content-Type': 'application/json; charset=utf-8',
                   "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/74.0.3729.169 Chrome/74.0.3729.169 Safari/537.36"}

        req = requests.get(URL, params=params, headers=headers)
        soup = BeautifulSoup(req.text, 'html.parser') 

        for td in soup.find_all("td", class_="gall_num"):
            val = td.string

            if val.isdigit():
                result.append(td.string)

        return result

    def save_post_list(self, boardID, post_list):
        success = 0

        for post in post_list:
            number = int(post)

            if Post.objects.filter(number=number).filter(board=boardID).exists():
                continue
            else:
                p = Post(board=boardID, number=number)
                p.save()
                success += 1

        return "saved post count : " + str(success)


        
            


if __name__ == "__main__":
    print("hi")
    c = Crawler()

    c.get_Image_DC("ohmygirl", 1535710)

    '''
    crawling_list = [ x + 1534000 for x in range(30)]
    print(crawling_list)

    for i in crawling_list:
        print(i)
        c.get_Image_DC("ohmygirl", i)

    '''
