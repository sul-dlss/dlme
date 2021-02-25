#!/bin/sh
envsubst '$RAILS_ROOT $RAILS_SERVER' < /tmp/app.conf > /etc/nginx/conf.d/default.conf

nginx -g "daemon off;"
