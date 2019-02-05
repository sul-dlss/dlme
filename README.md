[![Build Status](https://travis-ci.org/sul-dlss/dlme.svg)](https://travis-ci.org/sul-dlss/dlme) [![Coverage Status](https://coveralls.io/repos/sul-dlss/dlme/badge.svg?branch=master&service=github)](https://coveralls.io/github/sul-dlss/dlme?branch=master) [![Dependency Status](https://gemnasium.com/sul-dlss/dlme.svg)](https://gemnasium.com/sul-dlss/dlme)

# Digital Library of the Middle East

## Dataflows

This diagram represents how data gets loading into the application and ends up in the Solr index:

![overview diagram](https://docs.google.com/drawings/d/e/2PACX-1vTFw2LtovfIngR5wk-XcYLHOO-loPIxeUJqRQihsjchmTP9hiIoa5IvxSdGBd2aOvenF2HMx9H2rHUI/pub?w=3372&h=1608)
[Link to diagram in Google Drawings](https://docs.google.com/drawings/d/116Z4PzOrwiYGgc81nTUaM7pE6cAOwhCd3HnC3NTtWSo/edit?usp=sharing)

You can read more about our data and related documentation in our [data documentation](docs/README.md).

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

## Local Development

Most recently run with Ruby 2.5.3

After running bundle install you can spin up the rails server, jetty, and populate the solr index using these commands:

```console
$ bundle exec solr_wrapper 
$ rake spotlight:initialize #new shell window
$ REMOTE_USER=admin@admin.edu bundle exec rails s
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
All files must first be converted to the intermediate representation (IR) before
they can be imported.

Start by getting a personal access token from GitHub (https://github.com/settings/tokens)
with the public_repo scope enabled.  Put this in an environment variable called
`SETTINGS__IMPORT__ACCESS_TOKEN` (or put it in `settings.local.yml`)

Then, run this command (locally on the production machine)
```
 ./bin/fetch_and_import
```

This will pull all the MODS files from https://github.com/waynegraham/dlme-metadata/tree/master/maps/records/stanford
and all the TEI files from https://github.com/waynegraham/dlme-metadata/tree/master/manuscript/records/penn/schoenberg
and pull them into the local database.  It will launch background jobs to
transform them to the JSON IR and load them as `DlmeJson` resources in the database.
At this point they are also indexed into Solr for discovery.

If you want to repeat the transformation jobs without refetching the data you
may use:
```
./bin/reprocess_harvest <harvest_id>
```

You can also run traject directly:

```
$ bundle exec traject -c config/traject.rb -c lib/traject/mods_config.rb -s source="source of data as set in config/settings" [path to some file]
```

Example:

```
$ bundle exec traject -c config/traject.rb -c lib/traject/fgdc_config.rb -s source='harvard_fgdc' spec/fixtures/fgdc/HARVARD.SDE2.AFRICOVER_EG_RIVERS.fgdc.xml
```
