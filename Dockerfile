# from nginx latest
FROM nginx:latest

# specify working dir
WORKDIR /usr/share/nginx/html

# purge content
RUN rm -rf *

# add site
ADD $PWD/dist ./

# indicate port
EXPOSE 80
