# This image's actual base image
FROM starefossen/ruby-node:2-10

LABEL maintainer="Aaron Collier <aaron.collier@stanford.edu>"

# Set default RAILS environment
ENV RAILS_ENV=production
ENV RAILS_SERVE_STATIC_FILES=true
ENV BUNDLER_VERSION=2.0.1
ARG SECRET_KEY_BASE

# Create and set the working directory as /opt
WORKDIR /opt

RUN gem install bundler

# Copy the Gemfile and Gemfile.lock, and run bundle install prior to copying all source files
# This is an optimization that will prevent the need to re-run bundle install when only source
# code is changed and not dependencies.
COPY Gemfile /opt
COPY Gemfile.lock /opt

RUN bundle install

COPY . .
RUN rake assets:precompile
# Start the server by default, listening for all connections
CMD puma -C config/puma.rb
