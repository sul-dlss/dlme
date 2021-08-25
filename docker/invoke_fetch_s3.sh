#!/bin/sh


echo "Fetching resources from: ${S3_FETCH_URL}"

bundle exec rake fetch:s3[$S3_FETCH_URL]