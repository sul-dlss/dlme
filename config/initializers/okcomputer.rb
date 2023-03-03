OkComputer.mount_at = 'status'

Rails.application.reloader.to_prepare do
  OkComputer::Registry.register 'solr', OkComputer::SolrCheck.new(Blacklight.default_index.connection.uri.to_s.sub(/\/$/, ''))
end

OkComputer::Registry.register 'version', OkComputer::AppVersionCheck.new(env: 'GIT_INFO')
