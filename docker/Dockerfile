FROM ruby:2.7.5-alpine

LABEL maintainer="Aaron Collier <aaron.collier@stanford.edu>"

# Set up Ruby/Rails environment
ARG SECRET_KEY_BASE
ARG BUNDLE_WITHOUT="development:test"
ENV RAILS_ENV=production
ENV RAILS_SERVE_STATIC_FILES=true
ENV BUNDLER_VERSION=2.0.2
ENV BUNDLE_WITHOUT=$BUNDLE_WITHOUT

# Add system dependencies
RUN apk add --update --no-cache \
      nodejs \
      tzdata \
      libxml2-dev \
      libxslt-dev \
      postgresql-dev \
      sqlite-dev \
      yarn \
      git \
      imagemagick

# Create and set the working directory as /opt
WORKDIR /opt

# Add the entrypoint script used in development
COPY docker/dev-entrypoint.sh /usr/local/bin/dev-entrypoint.sh
RUN chmod +x /usr/local/bin/dev-entrypoint.sh

RUN gem update --system && \
  gem install bundler && \
  bundle config build.nokogiri --use-system-libraries

# Copy the Gemfile and Gemfile.lock, and run bundle install prior to copying all source files
# This is an optimization that will prevent the need to re-run bundle install when only source
# code is changed and not dependencies.
COPY Gemfile /opt
COPY Gemfile.lock /opt

RUN apk --no-cache add --virtual build-dependencies \
  build-base \
  && bundle install \
  && apk del build-dependencies

COPY . .

# Run this again while we're point at spotlight master, otherwise bundler complains:
# > The git source https://github.com/projectblacklight/spotlight.git is not yet checked out.
RUN apk --no-cache add --virtual build-dependencies \
  build-base \
  && bundle install \
  && apk del build-dependencies

RUN NO_DATABASE=true bundle exec rake assets:precompile

# Pass in git info so that okcomputer can show what version is running
ARG GIT_INFO
ENV GIT_INFO=$GIT_INFO
LABEL git_info=$GIT_INFO

# Start the server by default, listening for all connections
ENTRYPOINT ["bundle", "exec"]
CMD ["puma", "-C", "config/puma.rb"]
