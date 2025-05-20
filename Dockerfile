FROM node:18
RUN apt-get update && apt-get install

RUN npm cache clean --force && \
    rm -rf node_modules package-lock.json
    
WORKDIR /app
COPY package*.json ./

RUN npm install
RUN npm run build

CMD [ "npm", "run", "start:prod" ]
