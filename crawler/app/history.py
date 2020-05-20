from pymongo import MongoClient
import os

db_id = os.getenv('MONGO_INITDB_ROOT_USERNAME') or 'admin'
db_pw = os.getenv('MONGO_INITDB_ROOT_PASSWORD') or 'admin1'
db_host = os.getenv('DB_HOST') or 'localhost'
db_port = os.getenv('DB_PORT') or '27017'

url  = 'mongodb://{db_id}:{db_pw}@${db_host}:{db_port}'

client = MongoClient(url)

db = client["ohmydb"]
collection = db["history"]
print('history db connected')


def isCrawled(engine, group, no):

    if collection.count_documents({'engine': engine, 'group':group, 'no':no}) >= 1:
        return True
    
    return False

def insert(engine, group, no, created, postName, page):
    new_history = {
        'engine': engine,
        'group': group,
        'no':no,
        'created': created,
        'postName': postName,
        'checkImage': False,
        'page': page
    }

    return collection.insert_one(new_history)

def getNotCheckImage(engine, group):
    return collection.find_one({'engine': engine, 'group':group, 'checkImage':False})

def checkImage(engine, group, no, crawledTime, crawledNum):
    post = collection.find_one({'engine':engine, 'group':group, 'no': no})
    
    if post is None:
        print(engine + group + str(no) + ' is not available')
        return None

    if post['checkImage'] == True:
        print(engine + group + str(no) + ' is already crawled')
        return None

    post['checkImage'] = True
    post['crawledTime'] = crawledTime
    post['crawledNum'] = crawledNum
        
    collection.save(post)
    
    return post

if __name__ == '__main__':
    isCrawled('dc','ohmygirl','1111')
    insert('dc', 'ozzz', 12345)






