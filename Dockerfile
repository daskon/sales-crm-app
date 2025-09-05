FROM node:20-alpine

WORKDIR /app

COPY api/package*.json ./

RUN npm install

COPY api/ ./

ARG RAILWAY_MONGO_URI
RUN eco $RAILWAY_MONGO_URI

ARG RAILWAY_JWT_SECRET
RUN eco $RAILWAY_JWT_SECRET

RUN npm run build

EXPOSE 5100

CMD ["node", "dist/server.js"]