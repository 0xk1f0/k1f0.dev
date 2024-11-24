# from node latest
FROM node:bookworm-slim

# Set working directory
WORKDIR /app

# create necessary paths
RUN mkdir -p /config

# Copy initial necessary files to container
COPY package.json \
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

# symlink images path
RUN ln -s /app/dist/client/icons /icons

# expose 8081
EXPOSE 8081

# serve nginx
CMD ["npm", "run", "dist"]
