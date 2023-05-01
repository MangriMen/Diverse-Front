FROM node:18-alpine as build
WORKDIR /build

COPY package.json .
COPY yarn.lock .

RUN yarn install --production --network-timeout 100000

COPY . .

ARG API_BASE_URL
ENV VITE_APP_API_BASE_URL $API_BASE_URL

RUN yarn build

FROM nginx:alpine as prod
WORKDIR /app

COPY ./deploy/nginx.conf /etc/nginx/nginx.conf

RUN sed -i 's/<server_name>/$BASE_HOST/g' /etc/nginx/nginx.conf

RUN rm -rf /user/share/nginx/html/*

COPY --from=build /build/build /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]

FROM prod as test