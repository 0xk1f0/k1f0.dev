FROM node:22-slim as builder

# change workdir
WORKDIR /build

# Copy initial necessary files to container
COPY package.json \
    astro.config.mjs \
    tsconfig.json \
    ./

# Install dependencies
RUN npm install --omit=dev

# Copy all other files
COPY src ./src

# build
RUN npm run build

FROM node:22-slim

# Set working directory
WORKDIR /app

# copy app files
COPY --from=builder /build/package.json /app
COPY --from=builder /build/dist /app/dist
COPY --from=builder /build/node_modules ./node_modules

# make posts dir
RUN mkdir -p /posts && \
    mkdir -p /config

# copy misc files
COPY misc/entrypoint.sh /
COPY src/scripts/cache.js /app
COPY src/scripts/init.js /app
COPY misc/config.json /config

# expose 80
EXPOSE 80

# start app
CMD ["/entrypoint.sh"]
