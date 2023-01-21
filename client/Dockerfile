FROM node:16.15.0-alpine AS builder

WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build



FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
