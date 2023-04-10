# Bank sync validation
Backend api for slack connector app

## Running the code

### Install the dependences and start the server:
cd server
npm install
npm start

# Build the Docker image in the server folder
docker build -t slack-connector-app .

# Testing with unit tests
npm test

## License
This library is released under the MIT License.