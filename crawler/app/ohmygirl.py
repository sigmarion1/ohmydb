import os
from selenium import webdriver

from engines import Dc




if __name__ == '__main__':
    path = os.getenv('driver', "./chromedriver.exe")
    driver = webdriver.Chrome()
    #driver.implicitly_wait(3)

    
    omgdc = Dc(driver, 'ohmygirl', True)
    omgdc.run(1)
