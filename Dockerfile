FROM node:12.17.0-alpine

WORKDIR /app
COPY . .
RUN npm install --silent
RUN npm client:build

ENTRYPOINT ["node", "app.js"]