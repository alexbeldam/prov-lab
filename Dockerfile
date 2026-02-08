FROM inriavalda/provsql:latest

USER root

RUN apt-get update && apt-get install -y \
    gcc make autoconf automake libtool flex bison \
    gdb binutils valgrind libreadline-dev ant \
    libpq-dev postgresql-server-dev-all sudo git \
    iproute2 \
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

RUN cat <<EOF > ~/.gprom
backend=postgres
connection.host=127.0.0.1
connection.db=gprom_db
connection.user=postgres
connection.passwd=admin
connection.port=5432
EOF

COPY docker-entrypoint.sh /usr/local/bin/
RUN sed -i 's/\r$//' /usr/local/bin/docker-entrypoint.sh \
    && chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]