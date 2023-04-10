# Build the server app
FROM node:14-alpine AS server

WORKDIR /app
COPY package*.json ./
RUN npm install

# Expose the server port and run the app
EXPOSE 3000
CMD [ "npm", "start" ]
