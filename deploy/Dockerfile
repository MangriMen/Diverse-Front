FROM node:18-alpine as build
WORKDIR /build

COPY package.json .
COPY yarn.lock .

RUN apk update &&\
    apk upgrade &&\
    yarn install

COPY . .

ARG API_BASE_URL
ENV VITE_APP_API_BASE_URL $API_BASE_URL

RUN yarn build

FROM nginx:alpine as prod
WORKDIR /app

RUN rm -rf /user/share/nginx/html/*

RUN apk update &&\
    apk upgrade

COPY ./deploy/nginx.conf /etc/nginx/nginx.conf

RUN sed -i 's/<server_name>/$BASE_HOST/g' /etc/nginx/nginx.conf

COPY --from=build /build/build /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]

FROM prod as test