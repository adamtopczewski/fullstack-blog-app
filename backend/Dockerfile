FROM node:18.16.1-alpine

WORKDIR /usr/src/api

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/main"]