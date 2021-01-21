# frozen_string_literal: true

##
# Subclass of the ContactFormsController used for Record Feedback
# We're overriding to build from our RecordFeedbackForm class and
# to redirect to the correct place and set the correct notice
class RecordFeedbackController < Spotlight::ContactFormsController
  def create
    if @contact_form.valid?
      Spotlight::ContactMailer.report_problem(@contact_form).deliver_now

      redirect_back(
        fallback_location: spotlight.exhibit_solr_document_path(current_exhibit),
        notice: t(:'helpers.submit.record_feedback.created')
      )
    else
      render 'new'
    end
  end

  private

  def build_contact_form
    @contact_form = RecordFeedbackForm.new(contact_form_params)
    @contact_form.current_exhibit = current_exhibit
    @contact_form.request = request
    @contact_form
  end
end
