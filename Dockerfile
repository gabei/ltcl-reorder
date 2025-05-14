# search the term "CUSTOM" to find any rules that I've added 
# this configuration is from this stackoverflow question: 
# https://stackoverflow.com/questions/76067994/how-to-use-dockerfile-with-nodejs-and-typescript



ARG NODE_VERSION=22.13.1
FROM node:${NODE_VERSION}-alpine AS base

# install python
RUN apk add --no-cache python3 py3-pip

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
RUN npm run build

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000 
CMD [ "npm", "start" ]