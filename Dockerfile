FROM debian:bookworm-slim AS gprom-builder

USER root

RUN apt-get update && apt-get install -y \
    gcc make autoconf automake libtool flex bison \
    libreadline-dev ant libpq-dev postgresql-common git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src
RUN git clone https://github.com/IITDBGroup/gprom.git

WORKDIR /usr/src/gprom
RUN ./autogen.sh && \
    ./configure --with-libpq=$(pg_config --libdir) \
                --with-libpq-headers=$(pg_config --includedir) \
                --enable-postgres && \
    make && \
    make install

FROM eclipse-temurin:17-jre-jammy AS flyway-builder

ARG FLYWAY_VERSION=11.3.1

WORKDIR /flyway

RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/${FLYWAY_VERSION}/flyway-commandline-${FLYWAY_VERSION}-linux-x64.tar.gz \
    | tar xz --strip-components=1

FROM inriavalda/provsql AS provsql-builder

FROM postgres:15-bookworm

USER root

COPY --from=gprom-builder /usr/local/bin/gprom /usr/local/bin/gprom
COPY --from=gprom-builder /usr/local/lib/libgprom* /usr/local/lib/
RUN ldconfig

COPY --from=flyway-builder /flyway /flyway
COPY --from=flyway-builder /etc/ssl/certs /etc/ssl/certs
COPY --from=flyway-builder /usr/share/ca-certificates /usr/share/ca-certificates
RUN ln -s /flyway/flyway /usr/local/bin/flyway

COPY --from=provsql-builder \
    /usr/lib/postgresql/15/lib/provsql.so \
    /usr/lib/postgresql/15/lib/

COPY --from=provsql-builder \
    /usr/share/postgresql/15/extension/provsql* \
    /usr/share/postgresql/15/extension/

COPY --from=provsql-builder \
    /lib/x86_64-linux-gnu/libboost_serialization.so.1.74.0 \
    /lib/x86_64-linux-gnu/

RUN mv /usr/local/bin/docker-entrypoint.sh /usr/local/bin/original-entrypoint.sh

COPY docker/conf/flyway.conf /flyway/conf/flyway.conf
COPY docker/conf/gprom.conf /root/.gprom
COPY migrations /migrations

COPY docker/scripts /usr/local/bin/
RUN chmod +x /usr/local/bin/*.sh /usr/local/bin/provsql

ENV LOG_LEVEL=INFO

WORKDIR /root

CMD ["postgres", "-c", "shared_preload_libraries=provsql"]
