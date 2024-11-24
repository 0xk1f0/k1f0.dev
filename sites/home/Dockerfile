# from node latest
FROM node:bookworm-slim

# Set working directory
WORKDIR /app

# Copy initial necessary files to container
COPY package.json \
package-lock.json \
astro.config.mjs \
tailwind.config.cjs \
tsconfig.json \
./

# Install dependencies
RUN npm install

# Copy all other files
COPY src ./src

# build
RUN npm run build

# expose 8080
EXPOSE 8080

# serve nginx
CMD ["npm", "run", "dist"]
