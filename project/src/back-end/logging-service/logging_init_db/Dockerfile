FROM node:6.11-alpine
MAINTAINER Samir MARINI  <samir.marini@student.uclouvain.be>, Djafarou SALEYABDOU <djafarou.saleyabdou@student.uclouvain.be>

WORKDIR /usr/src/app/logging-service/logging_init_db

# header for loggining messages
ENV DEBUG logging-d

# name of container running CouchDB
ENV DB_HOST logs-db
# database name
ENV DB_NAME logs
# authentication information to CRUD (create/remove/update/delete) objects in our DB
ENV ADMIN_NAME admin
ENV ADMIN_PASSW admin
ENV COUCHDB_URL http://${ADMIN_NAME}:${ADMIN_PASSW}@${DB_HOST}:5984/${DB_NAME}

# we need CURL to verify that the key-value storage is running (see boot-in-order.sh)
RUN apk update && apk add curl

RUN npm install debug

COPY dataset ./dataset
COPY views ./views
COPY func_to_string.js ./
COPY fill_db.sh ./
COPY wait-for-couchdb.sh ./

CMD source wait-for-couchdb.sh

