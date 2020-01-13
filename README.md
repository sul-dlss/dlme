[![CircleCI](https://circleci.com/gh/sul-dlss/dlme.svg?style=svg)](https://circleci.com/gh/sul-dlss/dlme)
[![Coverage Status](https://coveralls.io/repos/github/sul-dlss/dlme/badge.svg)](https://coveralls.io/github/sul-dlss/dlme)

# Digital Library of the Middle East

## Dataflows

This diagram represents how data gets loaded into the application:

![overview diagram](https://github.com/sul-dlss/dlme/blob/master/README.md)
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
SETTINGS__ALLOW_ROBOTS
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

### Without Docker
The DLME application can be run in a standard Ruby/Rails environment locally using SolrWrapper, sqlite3, etc.

In order to not have to use Postgres locally (and use sqlite for for development), you'll want to bundle install without the production dependencies.

```bash
$ bundle install --without production
```

You can run the standard Rails setup script which will run your database migrations, etc.

```bash
$ ./bin/setup
```

To start Solr, you can use the `solr_wrapper` command.

```bash
$ solr_wrapper
```

Start the Rails app

```bash
$ rails s
```

You can create an admin user to login to the application by running Spotlight's `initialize` task.

```bash
$ bundle exec rake spotlight:initialize
```


### With Docker
For the local development described below, the webapp will be running in a docker container in development mode. Local
code will be shared into the container so that the webapp will be dynamically reloaded.

```console
[FIRST RUN]
$ docker-compose up -d postgres
$ docker-compose build app
$ docker-compose run app rake db:setup
$ docker-compose run app rake spotlight:initialize
[THEN]
$ docker-compose up -d
```

Once the DLME Rails app is running you can create an exhibit. The title will need to be 'dlme' and the URL slug will
need to be 'library'.

### Local transforms

Requires docker. If you are doing work on the DLME application you may not need to do local transforms and instead may be able to pull transform results from an S3 bucket.

First, install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html).

Configure AWS CLI to use localstack-run endpoints:

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

Note that this will need to be repeated every time localstack is started.

Make sure you have cloned the [dlme-metadata](https://github.com/sul-dlss/dlme-metadata) and [dlme-transform](https://github.com/sul-dlss/dlme-transform) repositories in sibling directories to the `dlme` directory.

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
                -e SKIP_FETCH_DATA=true \
                -v $(pwd)/../dlme-transform:/opt/traject \
                -v $(pwd)/../dlme-metadata:/opt/traject/data \
                -v $(pwd)/tmp/output:/opt/traject/output \
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

If you want to deploy a tagged version (recommended), then all you have to do is make a release on github. First create a tag
```
git tag 1.1.3
git push origin --tags
```

Then go to https://github.com/sul-dlss/dlme/releases/new?tag=1.1.3
and "Publish Release"

This will trigger circle to create a tagged image on docker hub.


Deploy Updated containers to AWS ([Development](https://github.com/sul-dlss/terraform-aws/blob/master/organizations/development/dlme/README.md) / [Staging](https://github.com/sul-dlss/terraform-aws/blob/master/organizations/staging/dlme/README.md) / [Production](https://github.com/sul-dlss/terraform-aws/blob/master/organizations/production/dlme/README.md)).

## Converting files

All files must first be converted to the intermediate representation (IR) before they can be imported. This is done by the https://github.com/sul-dlss/dlme-transform repository in our deployed environments.

There is also a mechanism for allowing users to copy and paste JSON directly into a textarea form field, which is purely for testing and development. **WARNING**: Data that flows in via this mechanism is *not* validated per the DLME JSON schema. This ability is disabled by default in production-like environments and may be turned on by flipping `Settings.feature_flags.allow_json_upload` to `true`. (It is enabled by default in the docker-compose service and in the test suite.)

Metadata coded as JSON IR should be loaded as `DlmeJson` resources in the database.
At this point they can be indexed into Solr for discovery.
