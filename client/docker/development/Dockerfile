# Specify the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Suppress non-critical warnings
ENV NODE_NO_WARNINGS=1

# Clear npm cache and install dependencies
# - `--legacy-peer-deps`: Allows installation despite peer dependency conflicts
# - `--loglevel=error`: Reduces verbosity to suppress non-critical warnings
RUN npm cache clean --force && npm install --legacy-peer-deps --loglevel=error

# Install Vite globally
RUN npm install -g vite --no-fund --no-audit


# Copy the rest of the code
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]