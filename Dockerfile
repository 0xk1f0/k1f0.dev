# from nginx latest
FROM nginx:latest

# update and install deps
RUN apt update && apt upgrade -y

# purge content
RUN rm -rf /usr/share/nginx/html/*

# add site
ADD $PWD/dist /usr/share/nginx/html/
