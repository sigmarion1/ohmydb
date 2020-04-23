from pymongo import MongoClient

client = MongoClient()
client = MongoClient('mongodb', 27017)
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
        'isCrawled': False,
        'page': page
    }

    return collection.insert_one(new_history)

def getNotCralwedOne(engine, group):
    return collection.find_one({'engine': engine, 'group':group, 'isCrawled':False})

def checkCrawled(engine, group, no, crawledTime, crawledNum):
    post = collection.find_one({'engine', 'group':group, 'no': no})
    
    if post is None:
        print(engine + group + str(no) + ' is not available')
        return None

    if post['isCrawled'] == True:
        print(engine + group + str(no) + ' is already crawled')
        return None

    post['isCrawled'] = True
    post['crawledTime'] = crawledTime
    post['crawledNum'] = crawledNum
        
    collection.save(post)
    
    return post



if __name__ == '__main__':
    isCrawled('dc','ohmygirl','1111')
    insert('dc', 'ozzz', 12345)






