FROM node:20-alpine

WORKDIR /app

COPY api/package*.json ./

RUN npm install

COPY api/ ./

RUN npm run build

EXPOSE 5100

CMD ["sh", "-c", "echo MONGO_URI=$MONGO_URI && node dist/server.js"]