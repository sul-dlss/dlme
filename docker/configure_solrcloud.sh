#!/bin/sh

set -e

# args & defaults: ./configure_solrcloud.sh <solr_host> <solr_collection>
SOLR_HOST=${1:-localhost}
SOLR_COLLECTION=${2:-dlme}  # also used for config name

# compress solr config so it can be uploaded via http
cd solr/config
zip -1 -r solr_config.zip ./*

# upload the config via the config api
curl -H "Content-type: application/octet-stream" --data-binary @solr_config.zip "http://admin:admin@$SOLR_HOST:8983/solr/admin/configs?action=UPLOAD&name=$SOLR_COLLECTION"

# wait a bit for config to be ready
sleep 10

# create a new collection using the config
curl -H "Content-type: application/json" "http://admin:admin@$SOLR_HOST:8983/api/collections/" -d "{create: {name: $SOLR_COLLECTION, config: $SOLR_COLLECTION, numShards: 1}}"
