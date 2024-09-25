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

  ##
  # Sets `mm` (minimum should match) to 1 based on presence of boolean operators, overriding default set in Solr.
  # The default value in the request handler (`6<-1 6<90%`) allows for some non-matching clauses in
  # full-text queries, but leads to unexpected behavior when a user expects to use boolean operators for
  # more advanced search queries. Setting `mm=1` means only 1 clause needs to match, but the lucene query parser (in
  # edismax) will precompose the query strings so everything works out.
  def min_match_for_boolean(solr_parameters)
    return unless search_state.query_param.respond_to?(:match?) &&
                  search_state.query_param&.match?(/\s(AND|OR|NOT)\s/)

    solr_parameters[:mm] = '1'
  end
end
