[![CircleCI](https://circleci.com/gh/sul-dlss/dlme.svg?style=svg)](https://circleci.com/gh/sul-dlss/dlme)
[![Coverage Status](https://coveralls.io/repos/github/sul-dlss/dlme/badge.svg)](https://coveralls.io/github/sul-dlss/dlme)

# Digital Library of the Middle East

## Dataflows

This diagram represents how data gets loaded into the application:

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
$ docker compose up -d postgres
$ docker compose build app
$ docker compose build sidekiq
$ docker compose run app bundle exec rake db:setup
$ docker compose run app bundle exec rake spotlight:initialize
[THEN]
$ docker compose up -d
```

Once the DLME Rails app is running you can create an exhibit. The title will need to be 'dlme' and the URL slug will
need to be 'library'.

#### Local Gem Development with Docker

1. Mount a volume connecting the local directory to (an arbitrarily named) directory accessible to the container. For example, for developing in the `blacklight-hierarchy` gem, add this to the DLME `docker-compose.yml`.
```
 volumes:
      - "/<your-local-path>/blacklight-hierarchy:/opt/local-gems/blacklight-hierarchy"
```

2. Restart the `dlme-app-1` container.

3. In the DLME `Gemfile` use the `path` option, for example:
`gem 'blacklight-hierarchy', path: '/opt/local-gems/blacklight-hierarchy'`

4. Enter the app container with `docker exec -it dlme-app-1 /bin/sh` and run `bundle install`. You should see output like the following:
   ```
   Using blacklight-hierarchy 5.4.0 from source at `/opt/local-gems/blacklight-hierarchy`

   ```

5. To see code changes in your gem reflected in your local environment, enter the app container with `docker exec -it dlme-app-1 /bin/sh` and run `rails restart`. 

#### Resetting Docker

It's possible that if you previously started the above docker-compose stack without the proper database name you will need to remove
the existing database volume in order to reset.

```console
docker container prune
docker volume prune
```

Then rerun the commands above for starting docker.

In some cases Docker containers may get stale and more thorough steps may be required. To completely clear all docker containers, pull new ones, and install packages:

```console
docker system prune -a -f --volumes
docker ps -aq
docker compose pull
bin/yarn install
```

The `docker ps -aq` command should return no containers. If container ids are returned, restart docker and run `docker system prune -a -f --volumes` again. Once these are complete rerun the commands above for starting docker. Note: for local transforms you will need to rebuild the dlme-transform container again as well. 

### Local transforms

Requires docker. If you are doing work on the DLME application you may not need to do local transforms and instead may be able to pull transform results from an S3 bucket.

First, install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html).

Configure AWS CLI to use localstack-run endpoints:

```
AWS_ACCESS_KEY_ID=999999 AWS_SECRET_ACCESS_KEY=1231 aws sns \
    --endpoint-url=http://localhost:4566 create-topic \
    --region us-east-1 \
    --name dlme-transform

AWS_ACCESS_KEY_ID=999999 AWS_SECRET_ACCESS_KEY=1231 aws s3api \
    --endpoint-url=http://localhost:4566 create-bucket \
    --region us-east-1 \
    --bucket dlme-transform

AWS_ACCESS_KEY_ID=999999 AWS_SECRET_ACCESS_KEY=1231 aws sns \
    --endpoint-url=http://localhost:4566 subscribe \
    --topic-arn arn:aws:sns:us-east-1:000000000000:dlme-transform \
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
                -e SNS_TOPIC_ARN=arn:aws:sns:us-east-1:000000000000:dlme-transform \
                -e SNS_ENDPOINT_URL=http://localhost:4566 \
                -e S3_ENDPOINT_URL=http://localhost:4566 \
                -e S3_BASE_URL=http://localstack:4566 \
                -e SKIP_FETCH_DATA=true \
                -v $(pwd)/../dlme-transform:/opt/traject \
                -v $(pwd)/../dlme-metadata:/opt/traject/data \
                -v $(pwd)/tmp/output:/opt/traject/output \
                --network="host" \
                suldlss/dlme-transform:latest \
                stanford/maps/data/kj751hs0595.mods
```

## Docker
### Building
You can build a local version of the application container using docker:
```sh
docker build . -f docker/Dockerfile -t suldlss/dlme:latest --build-arg SECRET_KEY_BASE=<your secret key base>
```
This can be useful to inspect the actual contents of the image to see what CircleCI will build as part of the continuous deployment process (see below). To spin up a copy of the image for inspection:
```sh
docker run -it --rm suldlss/dlme:latest /bin/sh
```
The `--rm` switch will remove the container after it exits, so that you can use it to inspect the filesystem and then clean it up automatically.
### Deploying
The app's four deployment environments are hosted on AWS through the [Elastic Container Service](https://aws.amazon.com/ecs/features/?pg=ln&sec=gs) and managed through [Terraform](https://www.terraform.io/) configs ([Development](https://github.com/sul-dlss/terraform-aws/blob/master/organizations/development/dlme/README.md) / [Staging](https://github.com/sul-dlss/terraform-aws/blob/master/organizations/staging/dlme/README.md) / [UAT](https://github.com/sul-dlss/terraform-aws/tree/master/organizations/staging/dlme-uat) / [Production](https://github.com/sul-dlss/terraform-aws/blob/master/organizations/production/dlme/README.md)).

There are two continuous deployment workflows in place:

- When code is merged to `main`, the CircleCI `build` workflow will build a new docker image, tag it as `suldlss/dlme:latest`, and deploy it to the **development** and **UAT** environments.
- When a new release is published on GitHub, the CircleCI `build-tags` workflow will build a new docker image, tag it as `suldlss/dlme:<version>`, and deploy it to the **staging** and **production** environments.

To publish a new release, first create a tag:
```sh
git tag 1.1.3   # for v1.1.3
git push origin --tags
```
Then go to https://github.com/sul-dlss/dlme/releases/new?tag=1.1.3 and click "Publish Release". This will trigger the CircleCI `build-tags` workflow.

### Debugging
#### Setup
The app containers run in a managed serverless environment called [AWS Fargate](https://aws.amazon.com/fargate/). In this context, there is no access to the Docker VM hosting the containers. To get access to the running containers themselves, you can use the [ECS Exec feature](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html).

ECS Exec requires several tools be installed and permissions be correctly set. To ensure that your local machine is ready to use it, you can use the [ECS Exec Checker](https://github.com/aws-containers/amazon-ecs-exec-checker) utility provided by Amazon. Before using the checker, ensure you have correctly configured your AWS CLI with sul-dlss profiles according to [the documentation provided by Ops](https://github.com/sul-dlss/terraform-aws/wiki/AWS-DLSS-Dev-Env-Setup). You also need the command-line tool `jq`, which can be installed via homebrew.

To use the checker, you need to supply both the name of the ECS cluster you wish to connect to (e.g. `dlme-dev`) and the task ID of the container you wish to connect to (e.g. `339b3bdc1a92400985bf6f033545169e`). Both of these can be found in the [AWS ECS Console](https://us-west-2.console.aws.amazon.com/ecs/v2/) under the "Clusters" tab. Task IDs are visible once you select a service (the main app is called `spotlight`) and visit the "Configuration and Tasks" tab. Select a task and its ID will be at the top of the page. Note that you need to be using the correct profile in the AWS console to see the cluster you want to debug (see below).

Before using the checker, specify which profile should be used to connect to the environment you want to debug. For development, this is the `development` profile. For UAT and Staging, it's `staging`. Production currently doesn't support the usage of ECS Exec by developers using the `ReadOnlyRole`. Set the profile as an environment variable in your shell, then run the checker:
```sh
export AWS_PROFILE=development  # or staging
./check-ecs-exec dlme-dev 339b3bdc1a92400985bf6f033545169e
```

The checker should run and not report any errors (red text). If it does, see the [documentation on checks and what they mean](https://github.com/aws-containers/amazon-ecs-exec-checker#checks) for how to proceed.
#### Execution
Once ECS Exec is working on your local machine, you can get an interactive shell on the container, similar to using `docker exec`:
```sh
aws ecs execute-command --cluster dlme-dev --task 339b3bdc1a92400985bf6f033545169e --command /bin/sh --profile development --interactive
```
Use caution when altering the environment of a running container. Remember that **your changes are ephemeral and will be overwritten** anytime a newer version of the container is deployed!

## Converting files

All files must first be converted to the intermediate representation (IR) before they can be imported. This is done by the https://github.com/sul-dlss/dlme-transform repository in our deployed environments.

There is also a mechanism for allowing users to copy and paste JSON directly into a textarea form field, which is purely for testing and development. **WARNING**: Data that flows in via this mechanism is *not* validated per the DLME JSON schema. This ability is disabled by default in production-like environments and may be turned on by flipping `Settings.feature_flags.allow_json_upload` to `true`. (It is enabled by default in the docker-compose service and in the test suite.)

Metadata coded as JSON IR should be loaded as `DlmeJson` resources in the database.
At this point they can be indexed into Solr for discovery.
