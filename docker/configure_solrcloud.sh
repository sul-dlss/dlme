#!/bin/sh

set -e

# args & defaults: ./configure_solrcloud.sh <solr_host> <solr_collection>
SOLR_HOST=${1:-localhost}
SOLR_COLLECTION=${2:-dlme}  # also used for config name
SOLR_URL="http://admin:admin@$SOLR_HOST:8983"

# function to wait until receiving a 200 for a given url
wait_for_ok()
{
  while [ "$(curl --silent --location --output /dev/null --write-out '%{http_code}' $1)" != "200" ]; do
    echo "waiting for solr to be ready..."
    sleep 1
  done
}

# compress solr config so it can be uploaded via http
echo "Zipping solr config..."
cd solr/config
zip -1 -r solr_config.zip ./*
echo "Created solr_config.zip"
wait_for_ok $SOLR_URL

# upload the config via the config api
curl --fail-with-body --header "Content-type: application/octet-stream" --data-binary @solr_config.zip "$SOLR_URL/solr/admin/configs?action=UPLOAD&name=$SOLR_COLLECTION"
echo "Uploaded solr config"
wait_for_ok $SOLR_URL

# create a new collection using the config
curl --fail-with-body --header "Content-type: application/json" --data "{create: {name: $SOLR_COLLECTION, config: $SOLR_COLLECTION, numShards: 1}}" "$SOLR_URL/api/collections/"
echo "Created solr collection"
wait_for_ok $SOLR_URL
