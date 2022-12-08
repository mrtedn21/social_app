FROM node:19-alpine
WORKDIR /app
COPY ./package* ./
RUN apk add --no-cache --virtual build-deps g++ make python3 \
    && npm install
COPY ./ ./
WORKDIR frontend/
RUN npm install
CMD ["npm", "start"]
