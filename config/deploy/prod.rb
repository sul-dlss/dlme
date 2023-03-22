# frozen_string_literal: true

server 'dlme-prod-a.stanford.edu', user: 'dlme', roles: %w[web db app]
server 'dlme-prod-b.stanford.edu', user: 'dlme', roles: %w[web app]
server 'dlme-review-prod-a.stanford.edu', user: 'dlme', roles: %w[web db app]
server 'dlme-review-prod-b.stanford.edu', user: 'dlme', roles: %w[web app]

Capistrano::OneTimeKey.generate_one_time_key!
set :rails_env, 'production'
