#!/bin/bash
set -e

echo "Beginning Startup"
if [[ ! -f '/usr/share/nginx/html/assets/config/config.json' ]]; then envsubst < /usr/share/nginx/html/assets/config/config.template.json > /usr/share/nginx/html/assets/config/config.json; fi;
echo "starting Nginx"
nginx -g 'daemon off;'