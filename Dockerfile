FROM nginx

COPY ./dist /site
COPY nginx.tmpl /etc/nginx/nginx.tmpl
COPY start.sh /start.sh

EXPOSE 80 443

ENTRYPOINT [ "/start.sh" ]