# frozen_string_literal: true

namespace :items do
  desc 'Fetch items in DLME IR from a remote URL and index them'
  task :fetch, [:url] => [:environment] do |_t, args|
    dlme_exhibit = Spotlight::Exhibit.first
    FetchResourcesJob.perform_now args[:url], dlme_exhibit
  end

  desc 'Import items in DLME IR from a local file and index them'
  task :import, [:file] => [:environment] do |_t, args|
    dlme_exhibit = Spotlight::Exhibit.first
    ImportResourcesJob.perform_now args[:file], dlme_exhibit
  end
end
