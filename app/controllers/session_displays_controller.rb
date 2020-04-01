# frozen_string_literal: true

##
# A controller for disabling session information
class SessionDisplaysController < ApplicationController
  ##
  # Update the session, to disable_search_context
  def update
    session[:disable_search_context] = true
    redirect_to request.referer
  end
end
