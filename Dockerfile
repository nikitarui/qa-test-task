FROM node:8.11

COPY . /code
RUN echo "HELLO"
WORKDIR /code

CMD ["node", "temp.js"]