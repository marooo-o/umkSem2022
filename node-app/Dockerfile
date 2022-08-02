# pull official base image
FROM node:alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json package-lock.json ./
RUN npm install --silent

# add app
COPY . ./

CMD ["node", "main.js"]