# frozen_string_literal: true

desc 'Deploy updated solr configuration'
task deploy_solr_configs: :environment do
  solr_url = Blacklight.connection_config[:url]
  parsed_uri = URI.parse(solr_url)
  user = parsed_uri.user
  pass = parsed_uri.password

  conn = Faraday.new(parsed_uri)
  conn.basic_auth user, pass

  resp = conn.put('/api/cluster/configs/dlme/managed-schema',
                  File.read(Rails.root.join('solr/config/schema.xml')),
                  content_type: 'application/xml')
  puts "#{resp.env.method} #{resp.env.url}"
  puts resp.body
  exit(1) unless resp.success?

  resp = conn.put('/api/cluster/configs/dlme/solrconfig.xml',
                  File.read(Rails.root.join('solr/config/solrconfig.xml')),
                  content_type: 'application/xml')
  puts "#{resp.env.method} #{resp.env.url}"
  puts resp.body
  exit(1) unless resp.success?

  resp = conn.get('/solr/admin/collections?action=RELOAD&name=dlme')
  puts "#{resp.env.method} #{resp.env.url}"
  puts resp.body
  exit(1) unless resp.success?
end
