FROM node:18-alpine as build
WORKDIR /build

COPY package.json .
COPY pnpm-lock.yaml .

RUN apk update &&\
    apk upgrade &&\
    npm install -g pnpm &&\
    pnpm i

COPY . .

ARG VITE_APP_API_BASE_URL
ENV VITE_APP_API_BASE_URL $VITE_APP_API_BASE_URL

RUN pnpm build

FROM nginx:alpine as prod
WORKDIR /app


RUN apk update &&\
    apk upgrade

COPY ./deploy/nginx.conf /etc/nginx/nginx.conf

ARG BASE_HOST

RUN sed -i "s/<server_name>/${BASE_HOST}/g" /etc/nginx/nginx.conf &&\
    rm -rf /user/share/nginx/html/*

COPY --from=build /build/build /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]

FROM prod as test