OkComputer.mount_at = 'status'

OkComputer::Registry.register 'solr', OkComputer::SolrCheck.new(Blacklight.default_index.connection.uri.to_s.sub(/\/$/, ''))

OKComputer::Registry.register 'redis', OkComputer::RedisCheck.new(url: ENV.fetch('SIDEKIQ_REDIS_URL', 'redis://localhost:6379/'))
