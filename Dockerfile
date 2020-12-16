FROM node:14.15

ENV BUILD_PATH /usr/src/app

RUN mkdir -p $BUILD_PATH
WORKDIR $BUILD_PATH
COPY . $BUILD_PATH

CMD ['node', '.app.js']