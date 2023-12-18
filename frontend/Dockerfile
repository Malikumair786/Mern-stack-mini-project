# Dockerfile for frontend

# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy package.json to the working directory
COPY frontend/package.json ./

# Copy package-lock.json to the working directory
COPY frontend/package-lock.json ./

# Install frontend dependencies
RUN npm install

# Bundle frontend source code
COPY frontend/ .

# Expose the port that your frontend will run on
EXPOSE 3000

# Specify the command to run on container start
CMD ["npm", "start"]
