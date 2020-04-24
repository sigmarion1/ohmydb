from engines import Dc
import random
import time

if __name__ == '__main__':
   
    omgdc = Dc('ohmygirl')

    omgdc.getImages()
    omgdc.getImages()
    omgdc.getImages()
    
    print('loop start')

    while True:
        omgdc.getImages()
        hour = random.randrange(10,20)
        time.sleep(60 * 60 * hour)


