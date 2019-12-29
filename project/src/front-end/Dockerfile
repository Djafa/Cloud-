# this image relies on the nodejs image, based on the Alpine minimal Linux distribution
FROM node:alpine
# set the working directory
WORKDIR /usr/src/scapp-front-end
# copy the configuration file into the working directory
COPY package.json .
# install dependencies
RUN npm install
# copy the source code
COPY public public
COPY src src
# deploy the front end
CMD npm start

