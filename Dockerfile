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
deno.json \
deno.lock. \
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
# wait for upstream fix
#RUN deno run -A --unstable --node-modules-dir npm:astro build

# Start deno
CMD ["deno", "run", "-A", "--unstable", "./dist/server/entry.mjs"]
