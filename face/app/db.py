from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient()
client = MongoClient('mongodb', 27017)
db = client["ohmydb"]
collection_history = db["history"]

print('face db connected')



def insert(group, no, who, title, path_original, path_thumbnail):
    history = collection_history.find_one({'group':group, 'no':no})

    if history is None:
        return False

    if not 'checkImage' in dict.keys():
        return False 

    if history['checkImage'] == False:
        return False

    history['_id'] = ObjectId()
    history['who'] = who
    history['title'] = title
    history['path_original'] = path_original
    history['path_thumbnail'] = path_thumbnail
    
    if len(who) >= 2:
        history['isGroup'] = True
    else:
        history['isGroup'] = False
    
    db[group].insert_one(history)

    return True


if __name__ == '__main__':

    insert('dc', 'ohmygirl', 10, ['효정', '유아'], '제목', '/1/2.jpg', '1/2/3.jpg')


