OkComputer.mount_at = 'status'

OkComputer::Registry.register 'solr', OkComputer::SolrCheck.new(Blacklight.default_index.connection.uri.to_s.sub(/\/$/, ''))

OkComputer::Registry.register 'version', OkComputer::AppVersionCheck.new(env: 'GIT_INFO')
