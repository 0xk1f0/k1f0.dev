# from node slim latest
FROM node:slim

# Set working directory
WORKDIR /app

# Copy initial necessary files to container
COPY package.json .
COPY package-lock.json .
COPY astro.config.mjs .

# Copy all files from src/
COPY src ./src

# Install dependencies and build
RUN npm install
RUN npm run build

# Start deno
CMD ["HOST=0.0.0.0", "PORT=8085", "node", "./dist/server/entry.mjs"]
