# Use the official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the server code
COPY . .

# Install TypeScript globally
RUN yarn global add typescript

# Build the TypeScript code
RUN yarn build

# Expose the server port (adjust if your server runs on a different port)
EXPOSE 4000

# Start the server
CMD ["yarn", "start"]
