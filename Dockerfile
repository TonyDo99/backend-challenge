# Dockerfile
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN yarn install

RUN yarn install --frozen-lockfile

RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD [ "yarn", "start" ]
