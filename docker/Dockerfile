FROM node:18-alpine3.18 as builder

WORKDIR /usr/src/app

COPY . .

RUN yarn install && \
    yarn build 

ENTRYPOINT ["yarn", "start"]
