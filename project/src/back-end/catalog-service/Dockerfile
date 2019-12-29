# this image relies on the nodejs image
FROM node:6.11-alpine
# set working directory
WORKDIR /usr/src/catalog-service
# we need CURL to verify that the key-value storage is running (see boot-in-order.sh)
RUN apk update && apk add curl

# let NPM packages be called anywhere within the container
ENV PATH /usr/src/catalog-service/node_modules/.bin:${PATH}
ADD package.json .
RUN npm install
RUN npm install azure-storage
RUN npm install --save jimp
# source files of the authentication service
ADD gulpfile.js .
ADD src src
ADD boot-in-order.sh .
# string to create tokens (see utils/en-de-coders.js)
ENV TOKEN_SECRET putilme
# header for loggining messages
ENV DEBUG catalog-d

# name of container running CouchDB
ENV DB_HOST catalog-db
# database name
ENV DB_NAME catalog
# authentication information to CRUD (create/remove/update/delete) objects in our DB
ENV ADMIN_NAME admin
ENV ADMIN_PASSW admin
ENV DB_URL http://${ADMIN_NAME}:${ADMIN_PASSW}@${DB_HOST}:5984/${DB_NAME}

ENV AZURE_STORAGE_ACCOUNT scapp2145
ENV AZURE_STORAGE_CONNECTION_STRING DefaultEndpointsProtocol=https;AccountName=scapp2145;AccountKey=rmfsR3V/zS5ZfQNdB47BBGOvizZ/izbDpmlMKLBiGmwpuwgKo1lthdAcG7XFVlyawbru5CCYguZjEGvs6NLDaQ==;EndpointSuffix=core.windows.net

# we now use an script to deploy the authentication service
CMD source boot-in-order.sh