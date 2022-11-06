FROM node:16
ENV NODE_ENV=production
WORKDIR /usr/src/app

ARG NODE_ENV=devlopment
ENV PORT=3000

COPY package*.json ./

RUN if [ "$NODE_ENV" = "production" ]; then npm ci --only=production; else npm install; fi
COPY . .

EXPOSE ${PORT}

RUN chown -R node /usr/src/app
USER node
CMD ["node", "index.js"]