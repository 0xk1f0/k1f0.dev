# from deno alpine latest
FROM denoland/deno:alpine

# Add npm
RUN apk update && \
    apk add npm

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

# The port deno listens on
EXPOSE 8085

# Start deno
CMD ["npm", "run", "denorun"]
