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

The AWS stack can be built using:

```
$ aws cloudformation create-stack --stack-name DLME --template-body file://cloudformation/stack.yaml --capabilities CAPABILITY_IAM --parameters file://path/to/some/params.json
```

After creating the stack, you also need to go into route53 and correct the DNS entry for solr. Change the public, elastic ip address to the internal IP (10.0.x.x).

## Converting files
All files must first be converted to the intermediate representation (IR) before
they can be imported. Do this by doing the following:

### Stanford MODS
```
./bin/transform_mods stanford_tk780vf9050 ./spec/fixtures/mods/stanford.mods
```
