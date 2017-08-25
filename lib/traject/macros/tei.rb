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

    def public_domain
      lambda do |_, accumulator|
        accumulator << 'http://creativecommons.org/publicdomain/mark/1.0/'
      end
    end

    def penn_image_query(idx)
      "/*/tei:facsimile/tei:surface[1]/tei:graphic[#{idx}]/@url"
    end

    def penn_web_image_query
      penn_image_query(3)
    end

    def penn_thumbnail_image_query
      penn_image_query(2)
    end

    def penn_image_uri(query)
      lambda do |record, accumulator, context|
        # Identifier without the prefix
        id = context.output_hash['id'].first.sub(/^[^_]*_/, '')
        path = extract_tei(query).call(record, [], context).first
        accumulator << penn_uri(id, path)
      end
    end

    def penn_uri(id, path)
      "http://openn.library.upenn.edu/Data/0001/#{id}/data/#{path}"
    end
  end
end
