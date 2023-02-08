[![CI](https://github.com/sul-dlss/dlme/actions/workflows/ruby.yml/badge.svg)](https://github.com/sul-dlss/dlme/actions/workflows/ruby.yml)
![Ruby Version](https://img.shields.io/badge/ruby-3.0-red)

# Digital Library of the Middle East

## Dataflows

This diagram represents how data gets loaded into the application:

![overview diagram](https://docs.google.com/drawings/d/e/2PACX-1vTBFJJgiPqs58fNWC-lTBdw5wKNN0-OgLBu7EUoJcfyDXFu6VTKkhxNUKcNSX4f1Mf_mHHI2zH_ezZj/pub?w=960&h=720)
[Link to diagram in Google Drawings](https://docs.google.com/drawings/d/1jEspB9tO6-_LyiN-q0jQwfEPtiaztgHzL6CgRKXiyBk/edit)

You can read more about our data and related documentation in our [data documentation](docs/README.md).

## Configuration

The deployment needs to provide the follow environment configuration:

```
AWS_ACCESS_KEY_ID
AWS_REGION
AWS_SECRET_ACCESS_KEY
SECRET_KEY_BASE
SETTINGS__ALLOW_ROBOTS
SOLR_URL
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
You may choose to run the dependencies using docker compose.

#### Stopping and starting
You can stop the entire stack with:
```sh
$ docker compose down
```
This process will gracefully stop and remove all running containers. Data is persisted in the form of volumes, and won't be removed. To start the stack back up again:
```sh
$ docker compose up     # add -d to run in the background and silence logs
```
You can stop and start individual containers by referring to them by their service name from `docker-compose.yml`:
```sh
$ docker compose stop solr
```
For more, see the [`docker compose` CLI reference](https://docs.docker.com/compose/reference/#command-options-overview-and-help).

#### Managing data
Data for the solr and redis services are persisted using docker named volumes. You can see what volumes are currently present with:
```sh
$ docker volume ls
```
If you want to remove a volume (e.g. to start with a fresh database or solr core), you can do:
```sh
$ docker volume rm dlme_solr-data   # to remove the solr data
```

## Converting files

All files must first be converted to the intermediate representation (IR) before they can be imported. This is done by the https://github.com/sul-dlss/dlme-transform repository in our deployed environments.

There is also a mechanism for allowing users to copy and paste JSON directly into a textarea form field, which is purely for testing and development. **WARNING**: Data that flows in via this mechanism is *not* validated per the DLME JSON schema. This ability is disabled by default in production-like environments and may be turned on by flipping `Settings.feature_flags.allow_json_upload` to `true`. (It is enabled by default in the docker-compose service and in the test suite.)

Metadata coded as JSON IR should be loaded as `DlmeJson` resources in the database.
At this point they can be indexed into Solr for discovery.

## Writing tests
### Adding fixture data

Fixture data for tests can be found in `spec/fixtures/json`. These json objects represent Solr records. Each `.json` file within this directory must contain *a single record object* only. Multiple objects in an array will not work (`[{...}, {...}]`). 
