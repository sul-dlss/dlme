# frozen_string_literal: true

namespace :transform do
  desc 'Purge transform results'
  task purge_results: :environment do
    TransformResult.destroy_all
  end
end
