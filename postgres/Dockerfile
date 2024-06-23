FROM postgres:14.12-alpine3.20

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=commerce

EXPOSE 5432

COPY postgres/initdb.d/ /docker-entrypoint-initdb.d/
