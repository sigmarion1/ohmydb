from recog import get_face_name

#OMG_MEMBER = {'group': '단체', 'hyojung': '효정', 'mimi': '미미', 'yooa': '유아', 'seunghee': '승희', 'jiho': '지호', 'binnie': '비니', 'arin': '아린'}

def recog_test():
    print(get_face_name('sample/1.jpg'))
    
if __name__ == '__main__':
    recog_test()







