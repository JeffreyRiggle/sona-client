FROM nginx:alpine

COPY ./dist /site
COPY nginx.tmpl /etc/nginx/nginx.tmpl
COPY start.sh start.sh

EXPOSE 80 443
RUN [ "chmod", "+x", "start.sh" ]

CMD /bin/sh -c "./start.sh"