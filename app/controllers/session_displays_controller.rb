# frozen_string_literal: true

##
# A controller for disabling session information
class SessionDisplaysController < ApplicationController
  ##
  # Update the session, to disable_search_context or disable_date_sort_context
  def update
    session[:disable_search_context] = true if params[:context] == 'result_info'
    session[:disable_date_sort_context] = true if params[:context] == 'date_sort_info'
    redirect_to request.referer
  end
end
