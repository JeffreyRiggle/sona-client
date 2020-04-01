#!/bin/bash

echo "Running script"
envsubst < /etc/nginx/nginx.tmpl > /etc/nginx/nginx.conf && nginx -g 'daemon off;' || cat /etc/nginx/nginx.conf