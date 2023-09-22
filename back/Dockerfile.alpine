# ./Dockerfile 
FROM python:3.11-alpine

HEALTHCHECK CMD curl --fail http://localhost/health

WORKDIR /usr/src/app

RUN apk update
RUN apk add pkgconfig
RUN apk add --no-cache gcc musl-dev mariadb-connector-c-dev 
RUN apk add curl

## Install packages
COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

## Copy all src files
COPY . .

## Run the application on the port 8080
EXPOSE 80

# gunicorn 배포 명령어
# CMD ["gunicorn", "--bind", "허용하는 IP:열어줄 포트", "project.wsgi:application"]
CMD ["gunicorn", "--bind", "0.0.0.0:80", "ohmydb.wsgi:application"]