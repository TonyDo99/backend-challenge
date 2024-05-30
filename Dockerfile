# Dockerfile
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

# Bundle app source
COPY . .

RUN yarn install --frozen-lockfile

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD [ "npm", "run", "start" ]
