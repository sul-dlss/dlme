# frozen_string_literal: true

##
# Show the status of harvests
class HarvestsController < Spotlight::ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

  def index
    # use default render
  end

  def create
    @harvest.save!
    ImportJob.perform_later(@harvest)
    redirect_to harvests_path, notice: 'A new data harvest has been started in the background.'
  end
end
