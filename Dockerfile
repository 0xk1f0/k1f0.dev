# from node alpine latest
FROM node:current-slim

# Set working directory
WORKDIR /app

# Copy initial necessary files to container
COPY package.json \
package-lock.json \
astro.config.mjs \
tailwind.config.cjs \
svelte.config.js \
./

# Install dependencies
RUN npm install

# Copy all other files
COPY src ./src

# build
RUN npm run build

# Start deno
CMD ["npm", "run", "dist"]
