FROM node:17

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

EXPOSE 3001

CMD ["node", "app.js"]