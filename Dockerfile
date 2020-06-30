FROM node:14

WORKDIR /home/iton/Programming/telegram_bot_giphy

COPY package*.json ./

RUN npm install

COPY . .


CMD ["node", "index.js"]