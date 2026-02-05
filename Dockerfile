FROM node:20-alpine

WORKDIR /app/web

COPY web/package*.json ./
RUN npm install

COPY web .

CMD ["npm", "run", "dev"]
