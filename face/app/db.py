import os
from dotenv import load_dotenv

env_path = os.path.join(os.pardir, os.pardir, '.env')
load_dotenv(dotenv_path=env_path)

from pymongo import MongoClient
from bson.objectid import ObjectId



db_host = os.getenv('DB_HOST') or 'localhost'
db_user = os.getenv('DB_USER') or 'admin'
db_pw = os.getenv('DB_PW') or 'admin'
db_name = os.getenv('DB_NAME') or 'page'

client = MongoClient(
    f"mongodb+srv://{db_user}:{db_pw}@{db_host}/{db_name}?retryWrites=true&w=majority"
)


db = client["ohmydb"]
collection_pic = db["pic"]

print('face db connected')


def insert(group, no, who, path_original, path_thumbnail):
    # history = collection_history.find_one({'group':group, 'no':no})

    # if history is None:
    #     return False

    # if not 'checkImage' in history.keys():
    #     return False 

    # if history['checkImage'] == False:
    #     return False

    pic = {}

    pic['_id'] = ObjectId()
    pic['group'] = group
    pic['no'] = no
    pic['who'] = who
    pic['path_original'] = path_original
    pic['path_thumbnail'] = path_thumbnail
    
    if len(who) >= 2:
        pic['isGroup'] = True
    else:
        pic['isGroup'] = False
    
    collection_pic.insert_one(pic)

    return True


if __name__ == '__main__':

    insert('ohmygirl', 342, ['효정', '유아'], '/1/2.jpg', '1/2/3.jpg')


