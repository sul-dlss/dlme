# frozen_string_literal: true

module Macros
  # Macros for extracting FGDC values from Nokogiri documents
  module FGDC
    NS = { fgdc: 'http://www.fgdc.gov/metadata/fgdc-std-001-1998.dtd' }.freeze

    def normalize_type
      extract_fgdc('/*/idinfo/citation/citeinfo/geoform', translation_map: 'types')
    end

    def harvard_uuid(record)
      urls = record.xpath('/*/idinfo/citation/citeinfo/onlink', NS).map(&:text)
      urls.first.split('CollName=')[1]
    end

    def extract_uuid(record, context)
      institution = context.settings.fetch('agg_provider')
      if institution.include?('Harvard')
        harvard_uuid(record)
      else
        record.xpath('/*/spdoinfo/ptvctinf/sdtsterm/@Name').map(&:text)
      end
    end

    def generate_fgdc_id
      lambda { |record, accumulator, context|
        identifier = select_identifier(record, context)

        accumulator << identifier if identifier.present?
      }
    end

    def select_identifier(record, context)
      uuid = extract_uuid(record, context)
      uuid.presence || default_identifier(context)
    end

    # @param xpath [String] the xpath query expression
    def extract_fgdc(xpath, options = {})
      extract_xml(xpath, NS, options)
    end
  end
end
