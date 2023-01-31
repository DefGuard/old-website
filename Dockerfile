FROM node:19.4-alpine as deps
RUN npm install -g @go-task/cli pnpm
WORKDIR /app
COPY pnpm-lock.yaml package.json .
RUN pnpm install

FROM deps as builder
WORKDIR /app
COPY . .
RUN task build

FROM nginx:1.23-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/src /usr/share/nginx/html
