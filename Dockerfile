FROM node:dubnium-alpine as builder

ENV NODE_ENV=build

USER root

WORKDIR /home/node

COPY . /home/node

RUN npm install && npm run build

# ---

FROM node:dubnium-alpine
USER node

ENV PORT=9000
ENV NODE_ENV=production

WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/dist/ /home/node/dist/

USER root

RUN apk --update --no-cache add curl

RUN rm -rf node_modules && npm install --production

USER node

HEALTHCHECK --interval=30s --timeout=3s \
CMD curl -f http://localhost:$PORT/healthcheck || exit 1

EXPOSE 9000
CMD ["npm", "start"]

