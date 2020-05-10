from engines import Dc
import random
import time

if __name__ == '__main__':
   
    omgdc = Dc('ohmygirl')
    
    print('loop start')

    while True:
        try:    
            omgdc.getImages()
            hour = random.randrange(10,20)
            time.sleep(60 * 60 * hour)
        except ConnectionError:
            print('ConnectionError')
            continue


