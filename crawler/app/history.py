from pymongo import MongoClient

client = MongoClient()
client = MongoClient('localhost', 27017)
db = client["history"]
print('history db connected')


def isCrawled(engine, id, num):
    collection = db[engine]
    
    if collection.count_documents({'id':id, 'num':num}) >= 1:
        return True
    
    return False

def insert(engine, id, num):
    collection = db[engine]
    new_history = {
        'id':id,
        'num':num
    }
    new_history_id = collection.insert_one(new_history)

    return new_history_id


if __name__ == '__main__':
    isCrawled('dc','ohmygirl','1111')
    insert('dc', 'ozzz', 12345)






