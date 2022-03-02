#!/bin/sh

set -e

# args & defaults: ./configure_solrcloud.sh <solr_host> <solr_collection>
SOLR_HOST=${1:-localhost}
SOLR_COLLECTION=${2:-dlme}  # also used for config name
SOLR_URL="http://admin:admin@$SOLR_HOST:8983/solr"

# function to wait until receiving a 200 for a given url
wait_for_ok()
{
  while [ "$(curl --silent --location --output /dev/null --write-out '%{http_code}' $1)" != "200" ]; do
    echo "Waiting for solr to be ready..."
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
curl --fail-with-body -X POST --header "Content-type: application/octet-stream" --data-binary @solr_config.zip "$SOLR_URL/admin/configs?action=UPLOAD&name=$SOLR_COLLECTION"
echo "Uploaded solr config"
wait_for_ok "$SOLR_URL/admin/configs?action=LIST"

# create a new collection using the config
curl --fail-with-body -X POST "$SOLR_URL/admin/collections?action=CREATE&name=$SOLR_COLLECTION&collection.configName=$SOLR_COLLECTION&numShards=1"
echo "Created solr collection"
wait_for_ok "$SOLR_URL/$SOLR_COLLECTION/admin/ping"
