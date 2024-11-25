FROM node:18-alpine:3.14.0

# Create app directory
WORKDIR /usr/src/app

# Copy the package.json and yarn.lock to /app
COPY package.json yarn.lock ./

RUN yarn install

# Bundle app source
COPY . .

# Build the app
RUN yarn build

# Expose port 3000 for the Next.js app
EXPOSE 3000

# Start the Next.js app
CMD [ "npm", "run", "dev" ]
