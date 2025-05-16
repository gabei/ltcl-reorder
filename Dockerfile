# search the term "CUSTOM" to find any rules that I've added 
# this configuration is from this stackoverflow question: 
# https://stackoverflow.com/questions/76067994/how-to-use-dockerfile-with-nodejs-and-typescript



# ARG NODE_VERSION=22.13.1
# FROM node:${NODE_VERSION}-alpine AS base

# # install python -- CUSTOM
# RUN apk add --no-cache python3 py3-pip

# # Create app directory
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# # Install app dependencies
# COPY package.json /usr/src/app/
# RUN npm install
# #RUN npm run build

# # Bundle app source
# COPY . /usr/src/app

# EXPOSE 3000 
# CMD [ "npm", "start" ]





# try 2

# Use an official Node.js runtime as a parent image
ARG NODE_VERSION=22.13.1
FROM node:${NODE_VERSION}-alpine AS base

# Set the working directory in the container
WORKDIR /usr/src/app

# install python -- CUSTOM
RUN apk add --no-cache python3 py3-pip

# Copy the rest of the application source code to the container
COPY . .

# Copy package.json and package-lock.json to the container
#COPY package*.json ./

# Install dependencies
RUN npm install

WORKDIR /usr/src/app/apps/reorder-app
RUN pip install -r requirements.txt --break-system-packages

# Expose port 3000 to the outside world
WORKDIR /usr/src/app
EXPOSE 3000

# Define environment variable
ENV NODE_ENV=production

# Command to run the application
CMD ["npm", "start"]