unless defined? Rails
  puts 'Loading environment...'
  require File.expand_path('../../config/environment', __FILE__)
end

settings do
  provide 'identifier', ''
  ::Settings.import.properties.each do |k, v|
    provide k, v
  end
  ::Settings.import.sources[fetch('source')].properties.each do |k, v|
    provide k, v
  end if key? 'source'
  provide 'allow_duplicate_values', false
end
