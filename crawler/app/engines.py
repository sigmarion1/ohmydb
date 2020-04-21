
from urllib.parse import urlencode
from history import isCrawled, insert
import time

class Dc:

    def __init__(self, driver, id, recommend=True):
        self.engine = 'dc'
        self.driver = driver
        self.id = id
        self.recommend = recommend
        self.url = 'https://gall.dcinside.com/board/lists/?' 

    def getUrl(self, page=False, no=False, recommend=False):
        params = {
            'id' : self.id
        }

        if page:
            params['page'] = page

        if no:
            params['no'] = no

        if recommend:
            params['exception_mode'] = 'recommend'

        return self.url + urlencode(params)      
        

    def run(self, page):

        self.driver.get(self.getUrl(page=page, recommend=self.recommend))

        nums = self.driver.find_elements_by_class_name('gall_num')

        for num in nums:
            if not num.text.isdigit():
                continue

            no = int(num.text)
            
            if isCrawled(self.engine, self.id, no):
                continue

            self.driver.get(self.getUrl(no=no, recommend=self.recommend))

            time.sleep(10)
            

        
            #insert(self.engine, self.id, n)
            


        #self.driver.quit()