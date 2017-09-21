# frozen_string_literal: true

module Macros
  # Macros for extracting values from CSV rows
  module NumismaticCsv
    def provider_department
      lambda do |row, accumulator, context|
        accumulator << "#{row['Department']} Department, #{context.output_hash['agg_provider'].first}"
      end
    end
  end
end
