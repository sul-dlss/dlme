# frozen_string_literal: true

server 'dlme-stage-a.stanford.edu', user: 'dlme', roles: %w[web db app]
server 'dlme-stage-b.stanford.edu', user: 'dlme', roles: %w[web app]

Capistrano::OneTimeKey.generate_one_time_key!
set :rails_env, 'production'