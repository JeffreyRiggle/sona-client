#!/bin/bash

echo "Running script"
echo $SONA_URL

if [ -z "${CERT}" ]
then
    echo "Using http config"
    envsubst < /etc/nginx/nginx.tmpl > /etc/nginx/nginx.conf && nginx -g 'daemon off;' || cat /etc/nginx/nginx.conf
else
    echo "Using https config"
    echo "${CERT}" > temp
    base64 -d temp > /etc/nginx/server.crt

    echo "${KEY}" > temp
    base64 -d temp > /etc/nginx/server.key
    envsubst < /etc/nginx/nginx.https.tmpl > /etc/nginx/nginx.conf && nginx -g 'daemon off;' || cat /etc/nginx/nginx.conf
fi