#!/bin/sh

# This script is called by the ECS task `dlme_index_from_s3`
# See https://github.com/sul-dlss/terraform-aws/blob/master/organizations/development/dlme/dlme-tasks.tf#L85
echo "Fetching resources from: ${S3_FETCH_URL}"

# Add additional logging output on rake for debugging
bundle exec honeybadger exec rake resources:fetch[$S3_FETCH_URL]
