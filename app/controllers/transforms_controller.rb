# frozen_string_literal: true

##
# Send message to the transformer
class TransformsController < Spotlight::ApplicationController
  before_action :authenticate_user!

  def show
    authorize! :create, :transform
  end

  def create
    authorize! :create, :transform
    TransformNotification.publish(params['data_dir'])
    flash[:notice] = t('transforms.notification.sent')
    redirect_to root_path
  end
end
