FROM node:18

WORKDIR /app

COPY package.json . 

RUN npm install --legacy-peer-deps

COPY . .

RUN NODE_ENV=development npm i

RUN npm run build


EXPOSE 3000

CMD ["npm", "start"]



