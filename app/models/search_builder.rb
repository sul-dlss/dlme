# frozen_string_literal: true

##
# Blacklight’s SearchBuilder converts blacklight request parameters into query parameters appropriate for search index.
# It does so by evaluating a chain of processing methods to populate a result hash
class SearchBuilder < Blacklight::SearchBuilder
  include Blacklight::Solr::SearchBuilderBehavior
  include BlacklightRangeLimit::RangeLimitBuilder
  include Spotlight::SearchBuilder

  ##
  # @example Adding a new step to the processor chain
  #   self.default_processor_chain += [:add_custom_data_to_query]
  #
  #   def add_custom_data_to_query(solr_parameters)
  #     solr_parameters[:custom] = blacklight_params[:user_value]
  #   end

  self.default_processor_chain += [:min_match_for_boolean]

  # Sets min match to 1 based on presence of boolean operators, overriding default set in Solr
  def min_match_for_boolean(solr_parameters)
    return unless blacklight_params &&
                  blacklight_params[:q].present? &&
                  blacklight_params[:q].respond_to?(:match) &&
                  blacklight_params[:q].match(/\s(AND|OR|NOT)\s/)

    solr_parameters[:mm] = '1'
  end
end
