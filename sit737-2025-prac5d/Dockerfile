# Use official Node.js image as base
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port and run app
EXPOSE 3000
CMD ["npm", "start"]