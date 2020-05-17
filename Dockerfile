FROM node:dubnium-alpine

ENV NODE_ENV=build

USER root
RUN apk --update --no-cache add curl

WORKDIR /home/node

COPY . /home/node

RUN npm install && \
    npm run build

ENV PORT=8080
ENV NODE_ENV=production

USER node

EXPOSE 8080

CMD ["npm", "start"]
