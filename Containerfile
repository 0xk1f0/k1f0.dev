FROM oven/bun:alpine

# change workdir
WORKDIR /app

# Copy initial necessary files to container
COPY package.json \
    astro.config.mjs \
    tsconfig.json \
    ./

# Install dependencies
RUN bun install

# Copy all other files
COPY src ./src

# build
RUN bun run build

# make posts dir
RUN mkdir -p /posts && \
    mkdir -p /config && \
    mkdir -p /database

# copy misc files
COPY misc/entrypoint.sh /
COPY misc/config.json /config

# expose 8080
EXPOSE 8080

# start app
CMD ["/entrypoint.sh"]
