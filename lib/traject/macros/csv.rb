# frozen_string_literal: true

module Macros
  # Macros for extracting values from CSV rows
  module Csv
    # @param header_or_index [String] the field header or index to accumulate
    def column(header_or_index, options = {})
      lambda do |row, accumulator, _context|
        return if row[header_or_index].to_s.empty?
        result = Array(row[header_or_index].to_s)
        result = result.flat_map { |s| s.split(options[:split]) } if options.key?(:split)
        result = result.collect(&:strip) if options.key?(:trim)
        accumulator.concat(result)
      end
    end

    def normalize_numismatic_id
      lambda do |row, accumulator, context|
        identifier = row['RecordId'].parameterize
        accumulator << identifier_with_prefix(context, identifier) if identifier.present?
      end
    end

    def normalize_numismatic_date
      lambda do |row, accumulator, _context|
        accumulator << row['Year'].to_s.tr('|', '-')
      end
    end
  end
end
