FROM node:12.17.0-alpine

WORKDIR /app
COPY . .
RUN npm install --silent

ENTRYPOINT ["node", "app.js"]