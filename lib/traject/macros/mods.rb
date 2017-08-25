# frozen_string_literal: true

module Macros
  # Macros for extracting MODS values from Nokogiri documents
  module Mods
    NS = { mods: 'http://www.loc.gov/mods/v3',
           rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
           dc: 'http://purl.org/dc/elements/1.1/',
           xlink: 'http://www.w3.org/1999/xlink' }.freeze

    def extract_name(role: nil, exclude: nil)
      clause = if role
                 Array(role).map { |r| "text() = '#{r}'" }.join(' or ')
               elsif exclude
                 Array(exclude).map { |r| "text() != '#{r}'" }.join(' and ')
               else
                 raise ArgumentError, 'You must provide either role or exclude parameters'
               end
      extract_mods("/*/mods:name[mods:role/mods:roleTerm/#{clause}]/mods:namePart")
    end

    def generate_mods_id
      lambda { |record, accumulator, context|
        identifier = select_identifier(record, context)

        accumulator << identifier_with_prefix(context, identifier) if identifier.present?
      }
    end

    def select_identifier(record, context)
      if record.xpath('/*/mods:identifier', NS).map(&:text).reject(&:blank?).any?
        record.xpath('/*/mods:identifier', NS).map(&:text).reject(&:blank?).first
      else
        default_identifier(context)
      end
    end

    def generate_relation(xpath)
      lambda do |record, accumulator|
        url = record.xpath("#{xpath}/mods:location/mods:url", NS).map(&:text)
        title = record.xpath("#{xpath}/mods:titleInfo/mods:title", NS).map(&:text)

        if url.present?
          accumulator.concat(url)
        elsif title.present?
          accumulator.concat(title)
        end
      end
    end

    def normalize_type
      extract_mods('/*/mods:typeOfResource', translation_map: 'types')
    end

    def normalize_language
      extract_mods('/*/mods:language/mods:languageTerm', translation_map: ['languages', default: '__passthrough__'])
    end

    def normalize_script
      extract_mods('/*/mods:language/mods:scriptTerm', translation_map: ['scripts', default: '__passthrough__'])
    end

    # @param xpath [String] the xpath query expression
    def extract_mods(xpath, options = {})
      extract_xml(xpath, NS, options)
    end
  end
end
