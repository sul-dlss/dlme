# frozen_string_literal: true

module Macros
  # Macros for extracting TEI values from Nokogiri documents
  module Tei
    NS = { tei: 'http://www.tei-c.org/ns/1.0' }.freeze

    # @param xpath [String] the xpath query expression
    def extract_tei(xpath, options = {})
      extract_xml(xpath, NS, options)
    end
  end
end
