FROM node:15.12.0-alpine3.10
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 9696
CMD ["npm", "start"]
