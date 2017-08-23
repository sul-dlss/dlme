# frozen_string_literal: true

module Macros
  # Macros for extracting TEI values from Nokogiri documents
  module Tei
    NS = { tei: 'http://www.tei-c.org/ns/1.0' }.freeze

    # @param xpath [String] the xpath query expression
    def extract_tei(xpath, options = {})
      extract_xml(xpath, NS, options)
    end

    def generate_data_provider(xpath)
      lambda do |record, accumulator|
        repository = record.xpath("#{xpath}/tei:repository", NS).map(&:text)
        institution = record.xpath("#{xpath}/tei:institution", NS).map(&:text)
        accumulator << [repository, institution].join(', ')
      end
    end
  end
end
