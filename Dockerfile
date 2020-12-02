# 1. Build our Stencil app
FROM node:alpine as builder

WORKDIR /app
COPY package.json package-lock.json ./
ENV CI=1
RUN npm ci

COPY . .
RUN npm run build --prod

# 2. Deploy our Stencil app to NGINX
FROM nginx:alpine

## Replace the default nginx index page with our Stencil app
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/www /usr/share/nginx/html
