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

FROM gcr.io/distroless/nodejs22-debian12:latest

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
COPY src/scripts/cache.js /
COPY src/scripts/init.js /
COPY misc/entrypoint.sh /
COPY misc/config.json /config

# expose 8080
EXPOSE 8080

# start app
CMD ["/entrypoint.sh"]
