FROM node:10

ARG REACT_APP_API_HOST

ENV REACT_APP_API_HOST="${REACT_APP_API_HOST}"

COPY . /app

WORKDIR /app

RUN yarn install && yarn run release && yarn cache clean

FROM nginx:alpine

COPY ./docker/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /app

COPY --from=0 /app/build .
