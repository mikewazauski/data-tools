FROM node:12 as build

WORKDIR /app

COPY . .
RUN npm install \
&& npm run build

# The standard nginx container just runs nginx. The configuration file added
# below will be used by nginx.
FROM nginx:1.21.1

# Copy the content of build folder to designated folder for nginx.
COPY --from=build /app/dist/anonymizer /usr/share/nginx/html

# Remove all existing nginx configuration files.
RUN rm /etc/nginx/conf.d/*

# Copy the customized configuration file to the directory in the docker image.
ADD ./http.conf /etc/nginx/conf.d/default.conf

# Install dumb-init for graceful termination
RUN apt-get update -y \
    && apt-get install -y dumb-init

WORKDIR /home/nginx
COPY ./startup.sh ./startup.sh
RUN chmod +x ./startup.sh


# Runs "/usr/bin/dumb-init -- /my/script --with --args"
# This signals that NGINX should shutdown gracefully
ENTRYPOINT [ "/usr/bin/dumb-init", "--rewrite", "15:0", "--" ]

# Instruct docker to use our script as the entry point
CMD [ "bash", "-c", "/home/nginx/startup.sh" ]
