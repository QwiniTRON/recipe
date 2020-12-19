FROM node:12.17.0-alpine

WORKDIR /app
COPY . .
RUN npm install --silent
RUN cd ./client && npm install --silent
RUN cd ..
RUN npm install react-scripts typescript -g --silent 
RUN cd ./client
RUN npm run build
RUN cd ..

ENTRYPOINT ["node", "app.js"]