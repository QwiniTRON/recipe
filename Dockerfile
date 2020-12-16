FROM node:12.17.0-alpine

WORKDIR /app
COPY . .

ENTRYPOINT ["node", "app.js"]