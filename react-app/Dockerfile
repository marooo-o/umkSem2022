# pull official base image
FROM node:alpine AS build

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json package-lock.json ./
RUN npm install react-scripts@5.0.0 -g --silent
RUN npm install --silent

# add app
COPY . ./

CMD ["npm", "start"]
