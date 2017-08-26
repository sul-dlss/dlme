# frozen_string_literal: true

module Macros
  # Macros for extracting values from CSV rows
  module Csv
    # @param header_or_index [String] the field header or index to accumulate
    def column(header_or_index, options = {})
      Macros::Extraction.traject_step do |row, accumulator, _context|
        result = Array(row[header_or_index].to_s.presence)
        result = Macros::Extraction.apply_extraction_options(result, options)
        accumulator.concat(result)
      end
    end

    def normalize_prefixed_id(header_or_index)
      Macros::Extraction.traject_step do |row, accumulator, context|
        identifier = row[header_or_index].to_s.parameterize
        accumulator << identifier_with_prefix(context, identifier) if identifier.present?
      end
    end

    def normalize_numismatic_date
      Macros::Extraction.traject_step do |row, accumulator, _context|
        accumulator << row['Year'].tr('|', '-')
      end
    end

    def normalize_penn_egyptian_provider
      Macros::Extraction.traject_step do |row, accumulator, _context|
        accumulator << "#{row['curatorial_section']} Section, Penn Museum"
      end
    end

    def normalize_penn_egyptian_shown_by
      Macros::Extraction.traject_step do |row, accumulator, _context|
        accumulator << "https://www.penn.museum/collections/object_images.php?irn={#{row['emuIRN']}}"
      end
    end
  end
end
