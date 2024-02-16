# from node latest
FROM node:bookworm-slim as builder

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

# from nginx latest
FROM nginx:bookworm

# replace nginx config
RUN rm -f /etc/nginx/nginx.conf
COPY docker/nginx.conf /etc/nginx/

# copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# expose 8080
EXPOSE 8080

# serve nginx
CMD ["nginx", "-g", "daemon off;"]
