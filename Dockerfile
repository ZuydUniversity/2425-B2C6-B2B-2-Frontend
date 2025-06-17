FROM node:24.2.0-alpine3.22

WORKDIR /app

COPY yarn.lock package.json ./

RUN yarn install

COPY . .

RUN yarn next telemetry disable

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]
