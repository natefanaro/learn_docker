FROM node:14

COPY . /app
WORKDIR /app

RUN ls -ll

RUN npm install

EXPOSE 3000

ENTRYPOINT ["node", "index.js"]
