# frozen_string_literal: true

# additional bulk actions specific to DLME
class DlmeBulkActionsController < Spotlight::BulkActionsController
  def delete_resources
    handle_bulk_action_with_job(DeleteSearchResultsJob)
  end
end
