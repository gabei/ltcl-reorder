# search the term "CUSTOM" to find any rules that I've added 
# this configuration is from this stackoverflow question: 
# https://stackoverflow.com/questions/76067994/how-to-use-dockerfile-with-nodejs-and-typescript



ARG NODE_VERSION=22.13.1
FROM node:${NODE_VERSION}-alpine AS base

# install python

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

# run tests
FROM base AS test
RUN NODE_ENV=development npm run test

# run build
FROM base AS prod
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000 
CMD [ "npm", "start" ]