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

For the local development described below, the webapp will be running in a docker container in development mode. Local 
code will be shared into the container so that the webapp will be dynamically reloaded. 

```console
$ docker-compose up -d
[FIRST RUN]
$ docker-compose run -e RAILS_ENV=development app rake db:setup
$ docker-compose stop app
$ docker-compose up -d
[ -------- ]
$ docker exec -e RAILS_ENV=development -it dlme_app_1 rake spotlight:initialize
```

Once the dlme rails app is running you can create an exhibit. The title will need to be 'dlme' and the URL slug will 
need to be 'library'.

### Local transforms
Configure localstack:

```
AWS_ACCESS_KEY_ID=999999 AWS_SECRET_ACCESS_KEY=1231 aws sns \
	--endpoint-url=http://localhost:4575 create-topic \
	--region us-east-1 \
	--name dlme-transform

AWS_ACCESS_KEY_ID=999999 AWS_SECRET_ACCESS_KEY=1231 aws s3api \
	--endpoint-url=http://localhost:4572 create-bucket \
	--region us-east-1 \
	--bucket dlme-transform

AWS_ACCESS_KEY_ID=999999 AWS_SECRET_ACCESS_KEY=1231 aws sns \
	--endpoint-url=http://localhost:4575 subscribe \
	--topic-arn arn:aws:sns:us-east-1:123456789012:dlme-transform \
	--protocol http \
	--region us-east-1 \
	--notification-endpoint http://app:3000/transform_result
```
Note that this will need to be repeated ever time localstack is started.

To perform a local transform that will write to localstack S3 and send a notification to localstack SNS: 

```
docker run --rm -e S3_BUCKET=dlme-transform \
                -e AWS_ACCESS_KEY_ID=999999 \
                -e AWS_SECRET_ACCESS_KEY=1231 \
                -e AWS_DEFAULT_REGION=us-east-1 \
                -e SNS_TOPIC_ARN=arn:aws:sns:us-east-1:123456789012:dlme-transform \
                -e SNS_ENDPOINT_URL=http://localhost:4575 \
                -e S3_ENDPOINT_URL=http://localhost:4572 \
                -e S3_BASE_URL=http://localstack:4572 \
                -e SKIP_FETCH_CONFIG=true \
                -e SKIP_FETCH_DATA=true \
                -v $(pwd)/.:/opt/traject \
                -v $(pwd)/../dlme-traject:/opt/traject/config \
                -v $(pwd)/../dlme-metadata:/opt/traject/data \
                -v $(pwd)/output:/opt/traject/output \
                --network="host" \
                suldlss/dlme-transform:latest \
                stanford/maps/data/kj751hs0595.mods
```

## Docker
### Build image
```
docker build . -f docker/Dockerfile -t suldlss/dlme:latest --build-arg SECRET_KEY_BASE=<your secret key base>
```

### Deploy
```
docker push suldlss/dlme:latest
```


## Converting files
All files must first be converted to the intermediate representation (IR) before they can be imported. This is done by the https://github.com/sul-dlss/dlme-transform repository.

Metadata coded as JSON IR should be loaded as `DlmeJson` resources in the database.
At this point they can be indexed into Solr for discovery.
