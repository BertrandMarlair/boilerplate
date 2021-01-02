FROM node:13.10-alpine

WORKDIR /src/app

COPY package.json .
COPY .eslintrc.js .
COPY .babelrc .
COPY ./src ./src
COPY entrypoint.sh .

RUN chmod +x ./entrypoint.sh
RUN apk add curl
RUN npm install -g babel-cli
RUN npm install
RUN npm rebuild bcrypt --build-from-source

ENTRYPOINT ["sh", "./entrypoint.sh"]

HEALTHCHECK --interval=60s --timeout=10s --retries=3 CMD curl -X POST --fail http://localhost:3003/health || exit 1

CMD ["npm","start"]