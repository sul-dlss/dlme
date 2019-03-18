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
    redirect_to transform_path, notice: t('transforms.notification.sent')
  end
end
