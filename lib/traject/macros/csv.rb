# frozen_string_literal: true

module Macros
  # Macros for extracting values from CSV rows
  module Csv
    # @param header_or_index [String] the field header or index to accumulate
    def column(header_or_index, options = {})
      lambda do |row, accumulator, _context|
        result = Array(row[header_or_index].to_s)
        result = result.map(&:strip) if options.key?(:trim)
        accumulator.concat(result)
      end
    end
  end
end
