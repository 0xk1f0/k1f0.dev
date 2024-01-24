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

# make sure root exists
RUN mkdir -p /var/www/html/

# copy files
COPY --from=builder /app/dist /var/www/html

# expose 80 and 443
EXPOSE 80
EXPOSE 443

# serve nginx
CMD ["nginx", "-g", "daemon off;"]
