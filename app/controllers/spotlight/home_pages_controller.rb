# frozen_string_literal: true

# This unpleasantness allows us to include the upstream controller before overriding it
spotlight_path = Gem::Specification.find_by_name('blacklight-spotlight').full_gem_path
require_dependency File.join(spotlight_path, 'app/controllers/spotlight/home_pages_controller')

module Spotlight
  # Override the upstream HomePagesController in order to inject range limit behaviors
  class HomePagesController
    include BlacklightRangeLimit::ControllerOverride

    # rubocop:disable Rails/LexicallyScopedActionFilter
    # Tweak the authorization for the range limit actions
    before_action :authenticate_user!, except: %i[show range_limit range_limit_panel]
    skip_authorize_resource only: %i[range_limit range_limit_panel]

    before_action only: %i[range_limit range_limit_panel] do
      authorize! :read, @page
    end
    # rubocop:enable Rails/LexicallyScopedActionFilter
    # Add the "homepage" group to the facets so we can get a different title key
    before_action only: %i[show] do
      blacklight_config.facet_fields.each_value do |config|
        config.group = 'homepage'
      end
    end
  end
end
