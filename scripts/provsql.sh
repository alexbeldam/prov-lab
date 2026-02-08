#!/bin/bash
set -e

exec psql \
  -U postgres \
  -d provsql_db \
  "$@"
