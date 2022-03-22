FROM node:16.14-alpine AS builder
COPY . /frontend
WORKDIR /frontend
RUN npm install
RUN npm run-script build --prod

FROM nginx:stable-alpine
COPY --from=builder /frontend/dist/skiosa-frontend /usr/share/nginx/html
COPY ./deployment/nginx.conf /etc/nginx/conf.d/default.conf
