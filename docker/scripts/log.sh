#!/bin/bash

ts() {
  date -u +"%Y-%m-%d %H:%M:%S.$(date +%3N) UTC"
}

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
  local level="$1"
  local msg="$2"

  local current_level
  local message_level

  current_level=$(level_to_int "$LOG_LEVEL")
  message_level=$(level_to_int "$level")

  [ "$message_level" -lt "$current_level" ] && return 0

  local color reset="\033[0m"
  case "$level" in
    DEBUG) color="\033[0;36m" ;;
    INFO)  color="\033[1;34m" ;;
    WARN)  color="\033[1;33m" ;;
    ERROR) color="\033[1;31m" ;;
    *)     color="\033[0m" ;;
  esac

  echo -e "${color}[$(ts)] [$$] [$level]${reset} $msg"
}
