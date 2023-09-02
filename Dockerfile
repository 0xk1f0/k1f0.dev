# from deno alpine latest
FROM denoland/deno:alpine

# Add npm for deno
RUN apk update && \
    apk add npm

# Set working directory
WORKDIR /app

# Copy initial necessary files to container
COPY package.json \
package-lock.json \
./

# Install dependencies
RUN npm install

# Copy all files from src/
COPY astro.config.mjs \
tailwind.config.cjs \
svelte.config.js \
src \
./

# build
RUN npm run build

# Start deno
CMD ["deno", "run", "-A", "--unstable", "./dist/server/entry.mjs"]
