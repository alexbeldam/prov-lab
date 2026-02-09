#!/bin/bash

source log.sh

create_db_if_not_exists () {
  local db="$1"

  if ! psql -U postgres -tAc \
      "SELECT 1 FROM pg_database WHERE datname='${db}'" \
      | grep -q 1; then
    log INFO "Creating database '${db}'..."
    psql -U postgres -c "CREATE DATABASE ${db};" > /dev/null
  else
    log DEBUG "Database '${db}' already exists"
  fi
}

create_db_if_not_exists provsql_db
create_db_if_not_exists gprom_db

run_flyway () {
  local db="$1"

  export FLYWAY_DB="$db"

  log INFO "Running Flyway on '$db'..."  

  if [[ "$db" == *provsql* ]]; then
    export FLYWAY_LOCATIONS="filesystem:/migrations/common,filesystem:/migrations/provsql"
  else
    export FLYWAY_LOCATIONS="filesystem:/migrations/common"
  fi

  log DEBUG "Flyway locations: ${FLYWAY_LOCATIONS}"

  flyway migrate \
    -skipCheckForUpdate \
    -color=always

  unset FLYWAY_LOCATIONS
}

run_flyway provsql_db
run_flyway gprom_db

log INFO "All migrations completed successfully."
