FROM node:20.11.1

WORKDIR /app
COPY ./package*.json ./
# RUN npm install -g npm@latest
RUN npm cache clean --force
RUN npm config set registry https://registry.npmjs.org/
RUN npm install
COPY . .

ENV JWT_TOKEN_KEY=PakBw6WxqD
ENV JWT_EXPIRES_IN=7d

# PORT
ENV PORT=4001

# Database

ENV EMAIL=

EXPOSE 4001


CMD ["npm", "run", "start:dev"]

