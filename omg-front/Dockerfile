FROM node:12.16.1 as builder 

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:${PATH}
COPY ./app/package.json ./package.json

RUN npm install

COPY ./app/public ./public
COPY ./app/src ./src

ENV REACT_APP_BACK_HOST ohmydb.com
ENV REACT_APP_BACK_PORT 8080

RUN npm run build

FROM nginx:1.17.10
COPY ./config/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]