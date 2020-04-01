#!/bin/bash

echo "Running script"
echo $SONA_URL

if [ -z "${HTTPS}" ]
then
    echo "Using http config"
    envsubst < /etc/nginx/nginx.tmpl > /etc/nginx/nginx.conf && nginx -g 'daemon off;' || cat /etc/nginx/nginx.conf
else
    echo "Using https config"
    envsubst < /etc/nginx/nginx.https.tmpl > /etc/nginx/nginx.conf && nginx -g 'daemon off;' || cat /etc/nginx/nginx.conf
fi