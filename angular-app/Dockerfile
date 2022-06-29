# pull official base image
FROM node:alpine AS build

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json package-lock.json ./
RUN npm install -g --silent @angular/cli
RUN npm install --silent

# add app
COPY . ./