FROM sigmarion1/face:0.1

WORKDIR /usr/src/app
COPY ./config/requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt

COPY ./app ./

CMD [ "python3", "-u", "./app.py"]
