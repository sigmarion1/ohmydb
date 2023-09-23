FROM animcogn/face_recognition:latest

HEALTHCHECK CMD curl --fail http://localhost/health

WORKDIR /usr/src/app

# install mysqlclient, health check dependancy
RUN apt-get update && \
    apt-get install -y python3-dev default-libmysqlclient-dev build-essential curl && \
    pip install --upgrade pip

## Install packages
COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

## Copy all src files
COPY . .

## Run the application on the port 80
EXPOSE 80

# gunicorn 배포 명령어
# CMD ["gunicorn", "--bind", "허용하는 IP:열어줄 포트", "project.wsgi:application"]
CMD ["gunicorn", "--bind", "0.0.0.0:80", "--capture-output",  "--enable-stdio-inheritance", "ohmydb.wsgi:application"]