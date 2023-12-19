# Dockerfile for backend (server)

# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory for the backend
WORKDIR /app/server

# Copy package.json and package-lock.json to the working directory
COPY server/package*.json ./

# Install backend dependencies
RUN npm install

# Bundle backend source code
COPY server/ .

# Expose the port that your backend will run on
EXPOSE 3001

# Specify the command to run on container start
CMD ["npm", "start"]
