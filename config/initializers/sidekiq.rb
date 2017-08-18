if defined? Sidekiq
  Sidekiq.configure_server do |config|
    config.redis = { url: "redis://#{ENV['REDIS_HOST']}:#{ENV['REDIS_PORT']}/1" }

    # we need to increase the db connection pool size to have one connection per thread
    # lest we run into "could not obtain a connection from the pool" errors
    db_config = ActiveRecord::Base.configurations[Rails.env]
    db_config['pool'] = Sidekiq.options[:concurrency]
    ActiveRecord::Base.establish_connection(db_config)
    Rails.logger.debug("Connection Pool size for Sidekiq Server is now: #{ActiveRecord::Base.connection.pool.instance_variable_get('@size')}")
  end

  Sidekiq.configure_client do |config|
    config.redis = { url: "redis://#{ENV['REDIS_HOST']}:#{ENV['REDIS_PORT']}/1" }
  end
end
