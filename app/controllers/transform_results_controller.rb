# frozen_string_literal: true

require 'json'
require 'date'

##
# Handle notifications of transform
class TransformResultsController < Spotlight::ApplicationController
  protect_from_forgery except: :create
  before_action :authenticate_user!, except: :create

  # This is invoked by SNS HTTP subscription
  def create
    TransformResult.create(build_notification)
    head :created
  end

  # This is invoked by transform_result.js
  def show
    authorize! :show, :transform
    @results = TransformResult.order(timestamp: :desc).limit(20)
    render formats: :json
  end

  private

  # @return [JSON] the deserialized JSON within the ++Message++ attribute of the JSON request body
  def notification_msg
    @notification_msg ||= JSON.parse(params['Message'])
  rescue JSON::ParserError
    # Capturing and logging so that can get SNS subscription confirmation message.
    logger.error request.raw_post
    raise
  end

  def build_notification
    {
      url: notification_msg['url'],
      data_path: notification_msg['data_path'],
      success: notification_msg['success'],
      records: notification_msg['records'],
      timestamp: DateTime.iso8601(notification_msg['timestamp']),
      duration: notification_msg['duration'],
      error: notification_msg['error']
    }
  end
end
