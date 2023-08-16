# from node slim latest
FROM node:slim

# Set working directory
WORKDIR /app

# Copy initial necessary files to container
COPY package.json .
COPY package-lock.json .
COPY astro.config.mjs .
COPY svelte.config.js .

# Copy all files from src/
COPY src ./src

# Install dependencies and build
RUN npm install
RUN npm run build

# env for node
ENV HOST=0.0.0.0
ENV PORT=8085

# Start deno
CMD ["node", "./dist/server/entry.mjs"]
