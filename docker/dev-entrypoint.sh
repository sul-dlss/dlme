#!/bin/sh

set -e

echo "Starting app version: $GIT_INFO"

# prevent bundle errors on missing gems
bundle check || bundle install --jobs 20 --retry 5

# prevent "server is already running" errors after restart
rm -f /opt/tmp/pids/server.pid

# run passed commands
bundle exec ${@}
