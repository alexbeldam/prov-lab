FROM debian:bookworm-slim AS builder

USER root

RUN apt-get update && apt-get install -y \
    gcc make autoconf automake libtool flex bison \
    libreadline-dev ant libpq-dev postgresql-common git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src
RUN git clone https://github.com/IITDBGroup/gprom.git gprom

WORKDIR /usr/src/gprom
RUN ./autogen.sh && \
    ./configure --with-libpq=$(pg_config --libdir) \
                --with-libpq-headers=$(pg_config --includedir) \
                --enable-postgres && \
    make && \
    make install

FROM inriavalda/provsql:latest

USER root

RUN apt-get update && apt-get install -y \
    libreadline8 iproute2 sudo logrotate \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /usr/local/bin/gprom /usr/local/bin/gprom
COPY --from=builder /usr/local/lib/libgprom* /usr/local/lib/
RUN ldconfig

RUN cat <<EOF > ~/.gprom
backend=postgres
connection.host=127.0.0.1
connection.db=gprom_db
connection.user=postgres
connection.passwd=admin
connection.port=5432
EOF

COPY docker/entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN sed -i 's/\r$//' /usr/local/bin/docker-entrypoint.sh \
    && chmod +x /usr/local/bin/docker-entrypoint.sh

COPY migrations /usr/local/share/migrations
COPY scripts/provsql.sh /usr/local/bin/provsql

RUN sed -i 's/\r$//' /usr/local/bin/provsql \
    && find /usr/local/share/migrations -type f -exec sed -i 's/\r$//' {} \; \
    && chmod +x /usr/local/bin/provsql

RUN mkdir -p /var/log/provlab

RUN cat <<EOF > /etc/logrotate.d/provlab
/var/log/provlab/*.log {
    size 10M
    rotate 5
    compress
    delaycompress
    missingok
    notifempty
    copytruncate
}
EOF

WORKDIR /root
ENV LOG_LEVEL=INFO
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]