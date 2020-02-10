# credits to https://jboka.de/2018/10/09/dockerize-node-application-with-mysql.html
FROM mysql:5.7

ENV MYSQL_DATABASE school;
ENV MYSQL_ROOT_PASSWORD test

COPY init_db.sql /docker-entrypoint-initdb.d/