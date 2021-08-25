# frozen_string_literal: true

# background job for deleting resources from solr and DB based on solr search results
class DeleteSearchResultsJob < ApplicationJob
  include Spotlight::JobTracking
  include Spotlight::GatherDocuments
  with_job_tracking(resource: ->(job) { job.arguments.last[:exhibit] })

  def perform(solr_params:, exhibit:, **)
    logger.info("Begin delete search results job. exhibit=#{exhibit}; solr_params=#{solr_params}.")

    @errors = 0
    each_document(solr_params, exhibit) do |document|
      remove_resource_for_solr_doc(document, exhibit)
      progress&.increment
    rescue StandardError => e
      job_tracker.append_log_entry(type: :error, exhibit: exhibit, message: e.to_s)
      @errors += 1
      mark_job_as_failed!
    end

    logger.info("Finished delete search results job with #{@errors} errors. exhibit=#{exhibit}; solr_params=#{solr_params}.")
  end

  private

  def remove_resource_for_solr_doc(solr_document, exhibit)
    resource = solr_document.sidecar(exhibit).resource
    ResourceRemover.remove_resource(resource: resource) if resource
  end
end
