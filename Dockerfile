FROM node:12.17.0-alpine

ENV BUILD_PATH /usr/src/app

RUN mkdir -p $BUILD_PATH
WORKDIR $BUILD_PATH
COPY . $BUILD_PATH

ENTRYPOINT ['node', 'app.js']