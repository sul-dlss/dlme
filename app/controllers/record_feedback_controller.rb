# frozen_string_literal: true

##
# Subclass of the ContactFormsController used for Record Feedback
# We're overriding to build from our RecordFeedbackForm class and
# to redirect to the correct place and set the correct notice
class RecordFeedbackController < Spotlight::ContactFormsController
  def action
    'record_feedback'
  end

  def send_feedback
    Spotlight::ContactMailer.report_problem(@contact_form).deliver_now
    redirect_back fallback_location: spotlight.exhibit_solr_document_path(current_exhibit),
                  notice: t(:'helpers.submit.record_feedback.created')
  end

  def report_failure
    redirect_back fallback_location: spotlight.exhibit_solr_document_path(current_exhibit),
                  alert: t(:'helpers.submit.record_feedback.error')
  end

  private

  def build_contact_form
    @contact_form = RecordFeedbackForm.new(contact_form_params)
    @contact_form.current_exhibit = current_exhibit
    @contact_form.request = request
    @contact_form
  end
end
