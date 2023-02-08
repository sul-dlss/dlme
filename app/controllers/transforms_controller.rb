# frozen_string_literal: true

##
# Send message to the transformer
class TransformsController < ApplicationController
  include Spotlight::Concerns::ApplicationController
  before_action :authenticate_user!

  def show
    authorize! :create, :transform
  end
end
