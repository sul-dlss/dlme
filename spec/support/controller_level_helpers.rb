# frozen_string_literal: true

# Stubs the expected methods provided by CatalogController
module ControllerLevelHelpers
  # Provide some expected methods
  module ControllerViewHelpers
    include Blacklight::Facet

    def search_state
      @search_state ||= Blacklight::SearchState.new(params, blacklight_config, controller)
    end

    # This allows you to set the configuration
    # @example: view.blacklight_config = Blacklight::Configuration.new
    attr_writer :blacklight_config

    def blacklight_config
      @blacklight_config ||= CatalogController.blacklight_config
    end

    def blacklight_configuration_context
      @blacklight_configuration_context ||= Blacklight::Configuration::Context.new(controller)
    end

    def search_action_path(*args, **kwargs)
      controller.search_catalog_path(*args, **kwargs)
    end
  end

  def initialize_controller_helpers(helper)
    helper.extend ControllerViewHelpers
  end
end
