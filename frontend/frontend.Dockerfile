FROM node:19-alpine
WORKDIR /app
COPY ./package* ./
RUN apk add --no-cache --virtual build-deps g++ make python3 \
    && npm install \
    && apk del --no-cache build-deps
COPY ./ ./
WORKDIR frontend/
CMD ["npm", "start"]
