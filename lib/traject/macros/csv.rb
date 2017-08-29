# frozen_string_literal: true

module Macros
  # Macros for extracting values from CSV rows
  module Csv
    # @param header_or_index [String] the field header or index to accumulate
    def column(header_or_index, options = {})
      lambda do |row, accumulator, _context|
        return if row[header_or_index].to_s.empty?
        result = Array(row[header_or_index].to_s)
        result = Macros::Extraction.apply_extraction_options(result, options)
        accumulator.concat(result)
      end
    end

    def normalize_prefixed_id(header_or_index)
      lambda do |row, accumulator, context|
        identifier = row[header_or_index].to_s.parameterize
        accumulator << identifier_with_prefix(context, identifier) if identifier.present?
      end
    end
  end
end
