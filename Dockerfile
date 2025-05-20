FROM node:21.6.2
RUN apt-get update && apt-get install

RUN npm install -g pnpm
RUN npm install -g typescript

RUN npm install -g @nestjs/cli
RUN npm install && pnpm run build

CMD [ "npm", "run", "start:prod" ]
