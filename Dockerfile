# from deno alpine
FROM denoland/deno:alpine

# Set working directory
WORKDIR /app

# Copy initial necessary files to container
COPY package.json \
package-lock.json \
deno.json \
deno.lock \
astro.config.mjs \
tailwind.config.cjs \
svelte.config.js \
./

# Copy all other files
COPY src ./src

# build
RUN deno run -A --unstable npm:astro build

# Start deno
CMD ["deno", "run", "-A", "--unstable", "./dist/server/entry.mjs"]
