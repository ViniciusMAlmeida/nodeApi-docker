FROM node:16-bullseye

WORKDIR /usr/app

EXPOSE 3000

CMD [ "npm","run","dev" ]