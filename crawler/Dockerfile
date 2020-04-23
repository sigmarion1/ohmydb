FROM python:3.7

WORKDIR /usr/src/app
COPY ./config/requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt

CMD [ "python3", "-u", "./bridge.py"]
