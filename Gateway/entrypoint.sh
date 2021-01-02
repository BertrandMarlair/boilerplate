#!/bin/bash

set -e

until curl -sf --silent config:3002/health; do
    echo "Try to connect to config server";

    sleep 5
done
  
>&2 echo "Config is up - executing command"

until [ "when not allowed" != *"curl redis:6379/ping"* ]; do
    echo "Try to connect to redis server";

    sleep 5
done

>&2 echo "Redis is up - executing command"

# until curl -sf --silent domoticz:4000/health; do
#     echo "Try to connect to domoticz server"

#     sleep 5
# done

>&2 echo "Domoticz server is up - executing command..."

exec "$@"
