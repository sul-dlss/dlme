# frozen_string_literal: true

module Macros
  # DLME helpers for traject mappings
  module DLME
    # construct a structured hash using values extracted using traject
    def transform_values(context, hash)
      hash.transform_values do |lambdas|
        accumulator = []
        Array(lambdas).each do |lambda|
          lambda.call(context.source_record, accumulator, context)
        end
        accumulator
      end
    end

    def provider
      from_settings('agg_provider')
    end

    def data_provider
      from_settings('agg_data_provider')
    end

    def from_settings(field)
      lambda { |_record, accumulator, context|
        accumulator << context.settings.fetch(field)
      }
    end
  end
end
