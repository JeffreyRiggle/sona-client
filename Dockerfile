FROM nginx:alpine

COPY ./dist /site
COPY nginx.tmpl /etc/nginx/nginx.tmpl

EXPOSE 80

CMD /bin/sh -c "envsubst < /etc/nginx/nginx.tmpl > /etc/nginx/nginx.conf && nginx -g 'daemon off;' || cat /etc/nginx/nginx.conf"