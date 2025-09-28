# Use official Node.js 14 as base image
FROM node:20-bullseye-slim AS build
# FROM node:16.20.2-buster-slim as dev

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install -g npm@11.2.0

# Copy the rest of the client code
COPY . .

# RUN cp .env .env
RUN rm -rf node_modules package-lock.json
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Build the client for production
RUN npm run build
# Keeps the container running indefinitely
# CMD ["tail", "-f", "/dev/null"]
# RUN npm run dev
FROM nginx:alpine

# Copy the build artifacts from the build stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
# NGINX default configuration file
COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /usr/src/app/.env /usr/share/nginx/html/.env
# Expose port 8080
EXPOSE 8080
# CMD ["nginx", "-g", "daemon off;"]

