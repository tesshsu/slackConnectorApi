# Build the server app
FROM node:14-alpine AS server

WORKDIR /app
COPY ["package.json", "package-lock.json", ".env", "./"]
RUN npm install

RUN apk update && \
    apk add --no-cache postgresql postgresql-client

# Create database
RUN su postgres -c "initdb -D /var/lib/postgresql/data"

# Start PostgreSQL
CMD ["su", "postgres", "-c", "/usr/bin/postgres -D /var/lib/postgresql/data"]

COPY . .

VOLUME /var/lib/postgresql/data

# Expose the server port and run the app
EXPOSE 3000
CMD [ "npm", "start" ]
