FROM node:16.17.1-alpine3.16 as build

WORKDIR /usr/src/app

COPY . .

RUN yarn install && \
    yarn build 

ENTRYPOINT ["yarn", "start"]
