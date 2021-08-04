# frozen_string_literal: true

desc 'Remove all resources in all exhibits'
task purge_all_resources: :environment do
  removal_count = ResourceRemover.remove_all_resources
  summary_msg = "purge_all_resources: #{removal_count} records were removed."
  puts summary_msg
  Rails.logger.info(summary_msg)
end
