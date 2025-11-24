# frozen_string_literal: true

require 'json'
require 'date'

##
# Handle notifications of transform
class TransformResultsController < ApplicationController
  include Spotlight::Concerns::ApplicationController

  protect_from_forgery except: :create
  before_action :authenticate_user!, except: :create

  # This is invoked by transform_result.js
  def show
    authorize! :show, :transform
    @results = TransformResult.order(timestamp: :desc).page(params[:page])
    render formats: :json
  end

  # This is invoked by SNS HTTP subscription
  def create
    transform_result = TransformResult.find_or_initialize_by(notification_params)
    transform_result.update(build_notification)
    head :created
  end

  private

  # @return [JSON] the deserialized JSON within the ++Message++ attribute of the JSON request body
  def notification_msg
    # We need to parse the raw_post data because AWS sends this to us as
    # 'Content-type: text/plain' and rails discards it as part of the params hash.
    # We then parse the 'Message' payload of the JSON which is also a JSON serialized string.
    # See https://forums.aws.amazon.com/thread.jspa?threadID=69413
    @notification_msg ||= JSON.parse(json_parsed_raw_post['Message'])
  rescue JSON::ParserError
    # Capturing and logging so that can get SNS subscription confirmation message.
    logger.error request.raw_post
    raise
  end

  def notification_params
    {
      url: notification_msg['url'],
      data_path: notification_msg['data_path']
    }
  end

  def build_notification
    {
      success: notification_msg['success'],
      records: notification_msg['records'],
      timestamp: DateTime.iso8601(notification_msg['timestamp']),
      duration: notification_msg['duration'],
      error: notification_msg['error']
    }
  end

  def json_parsed_raw_post
    JSON.parse(request.raw_post)
  end
end
