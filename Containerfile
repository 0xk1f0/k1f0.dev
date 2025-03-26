FROM docker.io/denoland/deno:alpine

# change workdir
WORKDIR /app

# Copy initial necessary files to container
COPY package.json \
    astro.config.mjs \
    tsconfig.json \
    ./

# Install dependencies
RUN deno install --allow-scripts

# Copy all other files
COPY src ./src

# build
RUN deno task build

# make posts dir
RUN mkdir -p /posts && \
    mkdir -p /config

# copy misc files
COPY misc/entrypoint.sh /
COPY misc/config.json /config

# expose 80
EXPOSE 80

# start app
CMD ["/entrypoint.sh"]
