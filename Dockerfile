FROM node:22.9.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD npx prisma migrate deploy && npm run start