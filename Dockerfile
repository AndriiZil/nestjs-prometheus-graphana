# Base image
FROM node:22-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock files first
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn install

# Copy the rest of the app source
COPY . .

# Creates a "dist" folder with the production build
RUN yarn run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]