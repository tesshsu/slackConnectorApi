# Slack connector app
Backend api for slack connector app

## Running the code

### Install the dependences and start the server:
cd server
npm install
npm start

# Build the Docker image in the server folder
cd server
docker build -t slack-connector-app .

# Run the Docker image
docker run -p 3000:3000 slack-connector-app

![uml](https://user-images.githubusercontent.com/3927152/232487162-04f923a4-cd6b-4b46-82cf-4af484961a05.png)

![test](https://user-images.githubusercontent.com/3927152/232569337-1c83ec1e-0886-4304-8405-b0d437943c64.png)

# Run client side
cd client
npm install
npm run dev

## License
This library is released under the MIT License.
