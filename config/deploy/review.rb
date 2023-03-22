# frozen_string_literal: true

# NOTE: you shouldn't need to individually deploy to this environment;
# it considered part of the prod environment. This config is provided for
# convenience when doing `cap ssh` etc.
server 'dlme-review-prod-a.stanford.edu', user: 'dlme', roles: %w[web db app]
server 'dlme-review-prod-b.stanford.edu', user: 'dlme', roles: %w[web app]

Capistrano::OneTimeKey.generate_one_time_key!
set :rails_env, 'production'
