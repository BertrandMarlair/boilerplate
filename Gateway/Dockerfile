FROM node:13.10-alpine

WORKDIR /src/app

COPY package.json .
COPY .eslintrc.js .
COPY .babelrc .
COPY ./src ./src
COPY entrypoint.sh .
COPY webpack.config.js .

RUN chmod +x ./entrypoint.sh
RUN apk add curl
RUN npm install -g babel-cli
RUN npm install

ENTRYPOINT ["sh", "./entrypoint.sh"]

HEALTHCHECK --interval=60s --timeout=10s --retries=3 CMD curl --fail http://localhost:3001/health || exit 1

CMD ["npm","start"]