
from urllib.parse import urlencode
from history import isCrawled, insert, getNotCralwedOne, checkCrawled
from bs4 import BeautifulSoup

import time, datetime
import requests
import random
import os

CRAWL_PATH = 'image_crawl'
ORI_PATH = 'ori'

class Dc:

    def __init__(self, id, recommend=True):
        self.engine = 'dc'
        self.id = id

        if recommend:
            self.recommend = 'recommend'
        else:
            self.recommend = ''

        self.listUrl = 'https://gall.dcinside.com/board/lists/' 
        self.viewUrl = 'https://gall.dcinside.com/board/view/'
        #'Content-Type': 'application/json; charset=utf-8',
        self.headers = {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/74.0.3729.169 Chrome/74.0.3729.169 Safari/537.36",
            "Referer" : ''
            }

    def getPosts(self, page):

        count = 0

        params = {
            'id' : self.id,
            'page': page,
            'exception_mode': self.recommend
        }

        headers = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/74.0.3729.169 Chrome/74.0.3729.169 Safari/537.36"}

        req = requests.get(self.listUrl, params=params, headers=headers)
        self.randDelay()
        soup = BeautifulSoup(req.text, 'html.parser')

        for tr in soup.find_all("tr", class_="ub-content us-post"):
            
            num = tr.findChildren("td", class_="gall_num")[0].string
            
            try:
                num_val = int(num)
            except:
                continue
            
            postName = tr.findChildren("a")[0].text
            
            datetimestr = tr.findChildren("td", class_="gall_date")[0]['title']
            datetimeobj = datetime.datetime.strptime(datetimestr, "%Y-%m-%d %H:%M:%S")

            if isCrawled(self.engine, self.id, num_val):
                continue

            insert(self.engine, self.id, num_val, datetimeobj, postName, page)
            count += 1
            
        print("page : " + str(page) + " Total posts crawled : " + str(count))


    def getImage(self):
        post = getNotCralwedOne(self.engine, self.id)

        if post is None:
            print('getImage : There are not available uncrawled posts')
            return 0

        params = {
            'id' : self.id,
            'no': post['no'],
            'exception_mode': self.recommend
        }

        headers = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/74.0.3729.169 Chrome/74.0.3729.169 Safari/537.36"}

        req = requests.get(self.viewUrl, params=params, headers=headers)
        self.randDelay()
        soup = BeautifulSoup(req.text, 'html.parser')

        view_box = soup.find("div", class_="writing_view_box")

        if view_box is None:
            print(req.url)
            print('getImage : no page')
            return 0

        images = view_box.find_all("img")
        
        num = 0
        
        for image in images:
            
            headers['Referer'] = req.url
            image_url = image.get('src')
            image_req = requests.get(image_url, headers=headers)
            self.randDelay()

            if image_req.headers.get('Content-Disposition') is None:
                print('getImage : Content-Disposition Error')
                continue

            image_file_ext = image_req.headers.get('Content-Disposition').split('.')[-1]



            image_file_name = str(self.id) + '_' + str(post['no']) + '_' + str(num) \
                + '.' + image_file_ext

            image_file_path = os.path.join(CRAWL_PATH, ORI_PATH, image_file_name)

            if not os.path.exists(os.path.join(CRAWL_PATH, ORI_PATH)):
                os.makedirs(os.path.join(CRAWL_PATH, ORI_PATH))            

            with open(image_file_path, 'wb') as f:
                f.write(image_req.content)

            print(image_file_name + ' is downloaded' )
            num += 1
        
        checkCrawled(self.engine, self.id, post['no'])

        return num

           
    def getImages(self, maximum=10):

        rand_page = (random.randrange(1,20))

        self.getPosts(rand_page)
        
        total_images = 0

        for _ in range(maximum):
            self.randDelay()
            total_images += self.getImage()

        print(datetime.datetime.now().strftime("[%Y-%m-%d %H:%M:%S]") + ' Image Downloaded : ' + str(total_images))
        
    
    def randDelay(self):
        time.sleep(random.randrange(1,5))

        


if __name__ == '__main__':
    dc = Dc('ohmygirl')
    #dc.getPosts(1)
    dc.getImages()