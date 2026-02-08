#!/bin/bash
set -e

LOG_DIR=/var/log/provlab
PROVSQL_LOG="${LOG_DIR}/provsql.log"
MIGRATIONS_LOG="${LOG_DIR}/migrations.log"

ts() { date -u +"%Y-%m-%dT%H:%M:%SZ"; }

LOG_LEVEL=${LOG_LEVEL:-INFO}

level_to_int() {
  case "$1" in
    DEBUG) echo 0 ;;
    INFO)  echo 1 ;;
    WARN)  echo 2 ;;
    ERROR) echo 3 ;;
    *)     echo 1 ;;
  esac
}

log() {
  local level=$1
  local msg=$2

  local current_level
  local message_level

  current_level=$(level_to_int "$LOG_LEVEL")
  message_level=$(level_to_int "$level")

  [ "$message_level" -lt "$current_level" ] && return 0

  local color reset="\033[0m"
  case "$level" in
    INFO)  color="\033[1;34m" ;;
    WARN)  color="\033[1;33m" ;;
    ERROR) color="\033[1;31m" ;;
    DEBUG) color="\033[0;36m" ;;
    *)     color="\033[0m" ;;
  esac

  echo -e "${color}[$(ts)] [$level]${reset} $msg"
}

log DEBUG "Running logrotate"
logrotate /etc/logrotate.d/provlab || true

log INFO "Starting provsql demo"

bash /opt/provsql/docker/demo.sh \
  >> "${PROVSQL_LOG}" 2>&1 &

PG_PID=$!

log INFO "Waiting for PostgreSQL to start..."

until pg_isready -U postgres > /dev/null 2>&1; do
  sleep 1
done

log INFO "PostgreSQL is ready"

create_db_if_not_exists () {
  local db=$1

  EXISTS=$(psql -U postgres -tAc \
    "SELECT 1 FROM pg_database WHERE datname='${db}'")

  if [ "$EXISTS" != "1" ]; then
    log INFO "Creating database '${db}'"
    psql -U postgres -c "CREATE DATABASE ${db};" > /dev/null
  else
    log DEBUG "Database '${db}' already exists"
  fi

  psql -U postgres -d "${db}" -q -c "
    SET client_min_messages TO error;
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  "
}

create_db_if_not_exists provsql_db
create_db_if_not_exists gprom_db

MIGRATIONS_DIR="/usr/local/share/migrations"

run_migrations () {
  local db=$1
  local skip_provsql=$2

  log INFO "Running migrations on ${db}"

  {
    echo "========================================"
    echo "DB: ${db}"
    echo "Timestamp: $(ts)"
    echo "========================================"
  } >> "${MIGRATIONS_LOG}"

  for file in $(ls -1 "${MIGRATIONS_DIR}"/*.sql | sort); do
    base=$(basename "$file")

    if [ "$skip_provsql" = "true" ] && [[ "$base" == *provsql* ]]; then
      log DEBUG "Skipping ${base} (provsql-specific)"
      echo "[SKIP][provsql] ${base}" >> "${MIGRATIONS_LOG}"
      continue
    fi

    APPLIED=$(psql -U postgres -d "$db" -tAc \
      "SELECT 1 FROM schema_migrations WHERE filename='${base}'")

    if [ "$APPLIED" = "1" ]; then
      log DEBUG "Skipping ${base} (already applied)"
      echo "[SKIP][applied] ${base}" >> "${MIGRATIONS_LOG}"
      continue
    fi

    log INFO "Applying ${base}"
    echo "[APPLY] ${base}" >> "${MIGRATIONS_LOG}"

    psql -U postgres -d "$db" \
      -v ON_ERROR_STOP=1 \
      -q \
      -c "SET client_min_messages TO error;" \
      -f "$file" >> "${MIGRATIONS_LOG}" 2>&1

    psql -U postgres -d "$db" -q \
      -c "INSERT INTO schema_migrations (filename) VALUES ('${base}');"
  done
}

run_migrations provsql_db false
run_migrations gprom_db true

log INFO "All migrations applied successfully"
log INFO "Container is ready"

wait $PG_PID
