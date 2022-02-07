# frozen_string_literal: true

namespace :fetch do
  desc 'Fetch S3 resources for indexing'
  task :s3, [:url] => [:environment] do |_t, args|
    dlme_exhibit = Spotlight::Exhibit.first
    FetchResourcesJob.perform_now args[:url], dlme_exhibit
  end
end
