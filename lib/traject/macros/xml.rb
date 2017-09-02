# frozen_string_literal: true

require 'traject/translation_map'

module Macros
  # Macros for extracting MODS values from Nokogiri documents
  module Xml
    # @param xpath [String] the xpath query expression
    # @param namespaces [Hash<String,String>] The namespaces for the xpath query
    # @param options [Hash] other options, may include :trim
    def extract_xml(xpath, namespaces, options = {})
      lambda do |xml, accumulator, _context|
        result = xml.xpath(xpath, namespaces).map(&:text)
        result = Macros::Extraction.apply_extraction_options(result, options)
        accumulator.concat(result)
      end
    end
  end
end
