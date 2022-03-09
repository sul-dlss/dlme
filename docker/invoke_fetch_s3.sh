#!/bin/sh


echo "Fetching resources from: ${S3_FETCH_URL}"

bundle exec honeybadger exec rake resources:fetch[$S3_FETCH_URL]
