# frozen_string_literal: true

namespace :resources do
  desc 'Fetch resources in DLME IR from a remote URL and index them'
  task :fetch, [:url] => [:environment] do |_t, args|
    dlme_exhibit = Spotlight::Exhibit.first
    AddResourcesJob.perform_now args[:url], exhibit: dlme_exhibit, local: false
  end

  desc 'Import resources in DLME IR from a local file and index them'
  task :import, [:file] => [:environment] do |_t, args|
    dlme_exhibit = Spotlight::Exhibit.first
    AddResourcesJob.perform_now args[:file], exhibit: dlme_exhibit, local: true
  end
end
