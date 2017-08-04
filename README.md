[![Build Status](https://travis-ci.org/sul-dlss/dlme.svg)](https://travis-ci.org/sul-dlss/dlme) [![Coverage Status](https://coveralls.io/repos/sul-dlss/dlme/badge.svg?branch=master&service=github)](https://coveralls.io/github/sul-dlss/dlme?branch=master) [![Dependency Status](https://gemnasium.com/sul-dlss/dlme.svg)](https://gemnasium.com/sul-dlss/dlme)

# Digital Library of the Middle East

## Configuration

The AWS deployment needs to provide the follow environment configuration:

```
SOLR_URL
SECRET_KEY_BASE
```

And these database configuration settings:
```
  database: "<%= ENV['RDS_DB_NAME'] %>"
  username: "<%= ENV['RDS_USERNAME'] %>"
  password: "<%= ENV['RDS_PASSWORD'] %>"
  host: "<%= ENV['RDS_HOSTNAME'] %>"
  port: "<%= ENV['RDS_PORT'] %>"
```

## Development

You can spin up the rails server, jetty, and populate the solr index using these commands:

```console
$ bundle exec solr_wrapper
$ bundle exec rails s
```

## Deploying

This project is configured for continuous deployment to AWS at http://spotlight.dlme.clir.org/
