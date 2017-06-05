FROM ubuntu:latest
WORKDIR /app

RUN apt-get update
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash - && apt-get install nodejs -y
RUN npm install webpack -g

CMD webpack --watch --watch-polling
