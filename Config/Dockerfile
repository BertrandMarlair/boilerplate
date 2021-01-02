FROM node:13.10-alpine

WORKDIR /src/app

COPY package.json .
COPY .eslintrc.js .
COPY .babelrc .
COPY .env .
COPY ./src ./src
COPY webpack.config.js .

RUN npm install -g babel-cli
RUN npm install

HEALTHCHECK --interval=60s --timeout=10s --retries=3 CMD curl --fail http://localhost:3002/health || exit 1

CMD ["npm","start"]