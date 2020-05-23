FROM node:dubnium-alpine

ENV NODE_ENV=build

USER root
RUN apk --update --no-cache add curl

WORKDIR /home/node

COPY . /home/node

RUN npm install && npm run build

ENV PORT=9000
ENV NODE_ENV=production

RUN rm -rf node_modules && npm install --production

HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:$PORT/v1/healthcheck || exit 1

USER node

EXPOSE 9000

CMD ["npm", "start"]
