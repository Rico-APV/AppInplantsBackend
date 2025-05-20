FROM node:21.6.2
RUN apt-get update && apt-get install

RUN npm install -g pnpm
RUN pnpm install -g typescript

RUN pnpm install -g @nestjs/cli
RUN pnpm install && pnpm run build

CMD [ "pnpm", "run", "start:prod" ]
