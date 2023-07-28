# Use the official Node.js image for building the React app
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the React app code
COPY . .

RUN yarn build:prod

# Use the "start" script to run the React development server
CMD ["yarn", "start:prod"]