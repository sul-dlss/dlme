# frozen_string_literal: true

module Macros
  # Macros for extracting MODS values from Nokogiri documents
  module Mods
    NS = { mods: 'http://www.loc.gov/mods/v3' }.freeze

    # @param xpath [String] the xpath query expression
    # @param namespaces [Hash<String,String>] The namespaces for the xpath query
    def extract_xml(xpath, namespaces)
      lambda do |xml, accumulator, _context|
        accumulator.concat(xml.xpath(xpath, namespaces).map(&:text))
      end
    end

    # @param xpath [String] the xpath query expression
    def extract_mods(xpath)
      extract_xml(xpath, NS)
    end
  end
end
