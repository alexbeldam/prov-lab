#!/bin/bash
set -euo pipefail
source log.sh

cd /tmp

log INFO "Starting container..."

original-entrypoint.sh "$@" &
PG_PID=$!

log INFO "Waiting for Postgres..."
until pg_isready -h localhost -U "${POSTGRES_USER:-postgres}" > /dev/null 2>&1; do
  sleep 1
done

log INFO "Postgres ready, running migrations..."
migrate.sh
log INFO "Container ready."

wait $PG_PID
