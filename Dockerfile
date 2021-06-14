FROM node:12.18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Bundle app source
COPY . .

RUN npm install
RUN npm run build

ENV NODE_ENV production
ENV REACT_APP_TASK_LIST_API_HOST=http://192.168.0.5:4000

EXPOSE 3000
CMD [ "npm", "start" ]