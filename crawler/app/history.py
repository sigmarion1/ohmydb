from pymongo import MongoClient

client = MongoClient()
client = MongoClient('localhost', 27017)
db = client["history"]
print('history db connected')


def isCrawled(engine, id, no):
    collection = db[engine]
    
    if collection.count_documents({'id':id, 'no':no}) >= 1:
        return True
    
    return False

def insert(engine, id, no, created, postName, page):
    collection = db[engine]
    new_history = {
        'id':id,
        'no':no,
        'created': created,
        'postName': postName,
        'isCrawled': False,
        'page': page
    }

    new_history_id = collection.insert_one(new_history)

    return new_history_id

def getNotCralwedOne(engine, id):
    collection = db[engine]

    return collection.find_one({'id':id, 'isCrawled':False})

def checkCrawled(engine, id, no):
    collection = db[engine]
    
    post = collection.find_one({'id':id, 'isCrawled':False, 'no': no})
    
    if post is not None:
        post['isCrawled'] = True
        
    collection.save(post)
    
    return post



if __name__ == '__main__':
    isCrawled('dc','ohmygirl','1111')
    insert('dc', 'ozzz', 12345)






