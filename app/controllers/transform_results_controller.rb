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
    head :ok
  end

  def show
    authorize! :show, :transform
    @results = TransformResult.order(timestamp: :desc).limit(20)
  end

  private

  def build_notification
    notification_msg = JSON.parse(JSON.parse(request.raw_post)['Message'])
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
