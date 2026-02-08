#!/bin/bash
set -e

/bin/bash /opt/provsql/docker/demo.sh &
PG_PID=$!

echo "Waiting for PostgreSQL to start..."

PG_BIN=$(ls -d /usr/lib/postgresql/*/bin | head -n 1)

until ${PG_BIN}/pg_isready -h localhost -U postgres > /dev/null 2>&1; do
  sleep 1
done

printf "\nPostgreSQL is ready.\n"

for db in "provsql_db" "gprom_db"; do
  EXISTS=$(${PG_BIN}/psql -h localhost -U postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$db'")
  if [ "$EXISTS" = "1" ]; then
    echo "Database '$db' already exists."
  else
    echo "Creating database '$db'..."
    ${PG_BIN}/psql -h localhost -U postgres -c "CREATE DATABASE $db;" > /dev/null
  fi
done

echo "Databases are ready for migrations. Keeping container alive."

wait $PG_PID