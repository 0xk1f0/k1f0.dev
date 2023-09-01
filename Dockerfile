# from node slim latest
FROM node:slim

# Set working directory
WORKDIR /app

# Copy initial necessary files to container
COPY package.json \
    package-lock.json \
    astro.config.mjs \
    tailwind.config.cjs \
    svelte.config.js .

# Install dependencies
RUN npm install

# Copy all files from src/
COPY src ./src

# build
RUN npm run build

# env for node
ENV HOST=0.0.0.0
ENV PORT=8085

# Start deno
CMD ["node", "./dist/server/entry.mjs"]
