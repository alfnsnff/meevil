FROM node:18-alpine as builder

COPY package*.json ./

WORKDIR /app

RUN npm install

COPY . .

COPY .env.example .env

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/public /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]