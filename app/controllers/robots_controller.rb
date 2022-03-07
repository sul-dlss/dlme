# frozen_string_literal: true

##
# Produced robots.txt based on values from config
class RobotsController < ApplicationController
  ALLOW_ALL = "User-agent: *\nCrawl-delay: 3\nDisallow:"
  ALLOW_NONE = ALLOW_ALL + ' /'

  def show
    text = Settings.allow_robots ? ALLOW_ALL : ALLOW_NONE
    render plain: text
  end
end
