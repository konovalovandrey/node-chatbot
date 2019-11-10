FROM library/node:slim

COPY . /app

RUN cd /app \
  && npm install csv-parse --production

WORKDIR /app

CMD node .