FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

# Set environment variables and Arguments
ARG NODE_ENV=devlopment
ENV NODE_ENV=${NODE_ENV}
ENV PORT=3000

# Install dependencies only if NODE_ENV is production
RUN if [ "$NODE_ENV" = "production" ]; then npm ci --only=production; else npm install; fi

COPY . .

EXPOSE ${PORT}

# Make the user node own the app directory and all its contents
RUN chown -R node /usr/src/app
USER node

CMD ["node", "index.js"]