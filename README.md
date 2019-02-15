[![Build Status](https://travis-ci.org/sul-dlss/dlme.svg)](https://travis-ci.org/sul-dlss/dlme) [![Coverage Status](https://coveralls.io/repos/sul-dlss/dlme/badge.svg?branch=master&service=github)](https://coveralls.io/github/sul-dlss/dlme?branch=master)

# Digital Library of the Middle East

## Dataflows

This diagram represents how data gets loading into the application:

![overview diagram](https://docs.google.com/drawings/d/e/2PACX-1vTBFJJgiPqs58fNWC-lTBdw5wKNN0-OgLBu7EUoJcfyDXFu6VTKkhxNUKcNSX4f1Mf_mHHI2zH_ezZj/pub?w=960&h=720)
[Link to diagram in Google Drawings](https://docs.google.com/drawings/d/1jEspB9tO6-_LyiN-q0jQwfEPtiaztgHzL6CgRKXiyBk/edit)

You can read more about our data and related documentation in our [data documentation](docs/README.md).

## Configuration

The AWS deployment needs to provide the follow environment configuration:

```
AWS_ACCESS_KEY_ID
AWS_REGION
AWS_SECRET_ACCESS_KEY
SECRET_KEY_BASE
SETTINGS__SNS__TOPIC_ARN
SOLR_URL
```

And these database configuration settings:
```
  database: "<%= ENV['RDS_DB_NAME'] %>"
  username: "<%= ENV['RDS_USERNAME'] %>"
  password: "<%= ENV['RDS_PASSWORD'] %>"
  host: "<%= ENV['RDS_HOSTNAME'] %>"
  port: "<%= ENV['RDS_PORT'] %>"
```

## Local Development

Requires docker.

```console
$ docker-compose up -d
[FIRST RUN]
$ docker-compose run app rake db:setup
$ docker-compose stop
$ docker-compose up -d
[ -------- ]
$ docker exec -it dlme_app_1 rake spotlight:initialize
```

Once the dlme rails app is running you can create an exhibit. The title will need to be 'dlme' and the URL slug will need to be 'library'

## Deploying

This project is configured for continuous deployment to AWS at http://spotlight.dlme.clir.org/

The AWS stack can be built using:

```
$ aws cloudformation create-stack --stack-name DLME --template-body file://cloudformation/stack.yaml --capabilities CAPABILITY_IAM --parameters file://path/to/some/params.json
```

After creating the stack, you also need to go into route53 and correct the DNS entry for solr. Change the public, elastic ip address to the internal IP (10.0.x.x).

## Converting files
All files must first be converted to the intermediate representation (IR) before they can be imported. This is done by the https://github.com/sul-dlss/dlme-transform repository.

Metadata coded as JSON IR should be loaded as `DlmeJson` resources in the database.
At this point they can be indexed into Solr for discovery.
