FROM ruby:2.7.5-alpine AS base

LABEL maintainer="Aaron Collier <aaron.collier@stanford.edu>"

# Rails environment is production by default; log to stdout as best practice
ENV RAILS_ENV=production
ENV RAILS_LOG_TO_STDOUT=true

# Add system dependencies
RUN apk add --update --no-cache \
  curl \
  imagemagick \
  git \
  gmp-dev \
  libxml2-dev \
  libxslt-dev \
  nodejs \
  postgresql-dev \
  sqlite-dev \
  tzdata \
  yarn \
  zip

# Create and set the working directory as /opt
WORKDIR /opt

# Update rubygems, install bundler and use system nokogiri
RUN gem update --system && \
  gem install bundler && \
  bundle config --local set without "development test" \
  bundle config --local build.nokogiri --use-system-libraries

# Copy the Gemfile and Gemfile.lock, and run bundle install prior to copying all
# source files. This is an optimization that will prevent the need to re-run 
# bundle install when only source code is changed and not dependencies.
COPY Gemfile /opt
COPY Gemfile.lock /opt
RUN apk --no-cache add --virtual build-dependencies \
  build-base \
  && bundle install \
  && apk del build-dependencies
COPY . .

# Pass in git info so that okcomputer can show what version is running
ARG GIT_INFO
ENV GIT_INFO=$GIT_INFO
LABEL git_info=$GIT_INFO

FROM base as webapp

# Make commands execute using `bundle exec` by default; base command is to
# start the rails server using puma
ENTRYPOINT ["bundle", "exec"]
CMD ["puma", "-C", "config/puma.rb"]

FROM webapp as webapp-prod

# Tell rails to serve static files & precompile them
ENV RAILS_SERVE_STATIC_FILES=true
RUN NO_DATABASE=true SECRET_KEY_BASE=sekret bundle exec rake assets:precompile

FROM webapp as webapp-test

# Set rails env to test and install test dependencies. Manually install chrome
# and chromedriver and disable webdrivers gem on alpine linux; see:
# https://stackoverflow.com/questions/57531771/rspec-with-headless-chrome-chromium-on-alpine-linux
ENV RAILS_ENV=test
ENV NO_WEBDRIVERS=1
RUN bundle config --local set without "development"
RUN apk --no-cache add --virtual build-dependencies \
  build-base \
  && bundle install \
  && apk del build-dependencies \
  && apk add --no-cache chromium-chromedriver

# Prepare the database so that tests can run, and run rspec by default
RUN bin/rails db:prepare
CMD ["rspec"]

FROM webapp as webapp-dev

# Set rails env to development and install dev dependencies
ENV RAILS_ENV=development
RUN bundle config --local unset without
RUN apk --no-cache add --virtual build-dependencies \
  build-base \
  && bundle install \
  && apk del build-dependencies

# Add the entrypoint script used in development; use the regular rails dev
# server instead of our puma config for prod
COPY docker/dev-entrypoint.sh /usr/local/bin/dev-entrypoint.sh
RUN chmod +x /usr/local/bin/dev-entrypoint.sh
ENTRYPOINT [ "dev-entrypoint.sh" ]
CMD ["rails", "server", "-b", "0.0.0.0"]

FROM base as worker-prod

# Run sidekiq by default
CMD ["sidekiq", "-C", "config/sidekiq.yml.erb"]

FROM worker-prod as worker-dev

# Install dev dependencies
ENV RAILS_ENV=development
RUN bundle config --local unset without
RUN apk --no-cache add --virtual build-dependencies \
  build-base \
  && bundle install \
  && apk del build-dependencies
