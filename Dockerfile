FROM node:16.13.1-buster-slim

RUN apt-get update && apt install -y libprotobuf-dev protobuf-compiler && apt-get -y install cmake && apt-get -y install exiftool

RUN mkdir -p /var/www/project3

WORKDIR /var/www/project3

COPY . .

RUN npm install -g nodemon