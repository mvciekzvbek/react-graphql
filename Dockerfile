# base image
FROM node:11.9.0-alpine as builder

# set working directory
COPY . /home/node/app
WORKDIR /home/node/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install react-scripts@1.1.4 -g

# start app
CMD ["npm", "start"]