#!/bin/sh

set -e

# prevent "server is already running" errors
rm -f /opt/tmp/pids/server.pid

# run the rails setup script to make sure no dependencies are missing and
# the server has been restarted
bin/setup

# run passed commands using `bundle exec`
bundle exec ${@}
