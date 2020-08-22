import os
from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
from recog import get_face_name
from PIL import Image

PATH_TEMP = 'image_temp'
THM_SIZE = (1024, 1024)

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/upload')
def render_file():
    return render_template('upload.html')

@app.route('/fileUpload', methods= ['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        image_ori = os.path.join(PATH_TEMP, secure_filename(f.filename))
        image_thm = os.path.join(PATH_TEMP, 'thm_'+ secure_filename(f.filename).split('.')[-2] + '.jpg')
    
        if not os.path.exists(PATH_TEMP):
            os.makedirs(PATH_TEMP)

        f.save(image_ori)
        img = Image.open(image_ori)
        img.thumbnail(THM_SIZE)
        img.convert('RGB').save(image_thm)
                    
        who = get_face_name(image_thm)

        try:
            os.remove(image_ori)
        except OSError:
            pass

        try:
            os.remove(image_thm)
        except OSError:
            pass

        return jsonify({'who':list(set(who))})


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)
