from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient()
client = MongoClient('pymongo', 27017)

print('image db connected')


def insert(engine, id, no, who, title, path_original, path_thumbnail):
    history = client["history"][engine].find_one({'id':id, 'no':no})

    if history is None:
        history = {}

    history['_id'] = ObjectId()
    history['who'] = who
    history['title'] = title
    history['path_original'] = path_original
    history['path_thumbnail'] = path_thumbnail
    
    client["image_db"][id].insert_one(history)

    


    # db = 
    
    # client["image_db"][engine].

    # collection.find_one({'id':id, 'isCrawled':False})


    # collection = db[engine]
    # new_history = {
    #     'id':id,
    #     'no':no,
    #     'created': created,
    #     'postName': postName,
    #     'isCrawled': False,
    #     'page': page
    # }

    # new_history_id = collection.insert_one(new_history)

    # #who
    # #title
    # #path_original
    # #path_thumbnail

    # return new_history_id



if __name__ == '__main__':

    insert('dc', 'ohmygirl', 10, ['효정', '유아'], '제목', '/1/2.jpg', '1/2/3.jpg')


