# frozen_string_literal: true

##
# Creating new DLME JSON items
class DlmeJsonsController < ApplicationController
  include Spotlight::Concerns::ApplicationController
  helper :all

  before_action :authenticate_user!

  load_and_authorize_resource :exhibit, class: Spotlight::Exhibit
  load_and_authorize_resource class: 'DlmeJson',
                              through_association: 'exhibit.resources',
                              instance_name: 'resource',
                              except: :index

  def index
    @resources = DlmeJson.accessible_by(current_ability).order(:url).page params[:page]
  end

  def show
    # default render
  end

  def edit
    # default render
  end

  # Called when submitting the form with JSON on it.
  def create
    @resource.exhibit = current_exhibit
    @resource.attributes = resource_params
    if @resource.save_and_index
      redirect_to spotlight.admin_exhibit_catalog_path(current_exhibit),
                  notice: t('spotlight.resources.upload.success')
    else
      redirect_to spotlight.new_exhibit_resource_path(current_exhibit),
                  flash: { error: t('spotlight.resources.upload.error') }
    end
  end

  def update
    @resource.attributes = resource_params
    if @resource.save_and_index
      flash[:notice] = t('.success')
      redirect_to exhibit_dlme_jsons_path(current_exhibit)
    else
      flash[:error] = t('.error')
      render :edit
    end
  end

  def destroy
    Blacklight.default_index.connection.delete_by_id @resource.json['id']
    @resource.destroy
    redirect_back(fallback_location: root_path)
  end

  private

  def resource_params
    params.require(:dlme_json).permit(data: [:json])
  end
end
