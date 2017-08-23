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
        result = result.map(&:strip) if options.key?(:trim)
        result = apply_translation(result, options) if options.key?(:translation_map)
        accumulator.concat(result)
      end
    end

    def apply_translation(values, options)
      translation_map = Traject::TranslationMap.new(*Array(options[:translation_map]))
      # without overwriting (further) translation map, could add
      # fuzzy match method here after pulling array out of TM
      values = Array(values).map(&:downcase)
      translation_map.translate_array! values
    end
  end
end
