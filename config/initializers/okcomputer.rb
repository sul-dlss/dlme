OkComputer.mount_at = 'status'

OkComputer::Registry.register 'solr', OkComputer::SolrCheck.new(Blacklight.default_index.connection.uri.to_s.sub(/\/$/, ''))
