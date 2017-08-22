puts 'Loading environment...'
require File.expand_path('../../config/environment', __FILE__)

settings do
  provide 'identifier', ''
  provide 'exhibit_slug', ::Settings.import.slug
  provide 'allow_duplicate_values', false
end
