# frozen_string_literal: true

module Macros
  # Macros for extracting MODS values from Nokogiri documents
  module Mods
    NS = { mods: 'http://www.loc.gov/mods/v3',
           rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
           dc: 'http://purl.org/dc/elements/1.1/' }.freeze

    def extract_name(role: nil, exclude: nil)
      clause = if role
                 "text() = '#{role}'"
               elsif exclude
                 "text() != '#{exclude}'"
               else
                 raise ArgumentError, 'You must provide either role or exclude parameters'
               end
      extract_mods("/*/mods:name[mods:role/mods:roleTerm/#{clause}]/mods:namePart")
    end

    def normalize_type
      extract_mods('/*/mods:typeOfResource', translation_map: 'types')
    end

    def normalize_language
      extract_mods('/*/mods:language/mods:languageTerm', translation_map: 'languages')
    end

    def normalize_script
      extract_mods('/*/mods:language/mods:scriptTerm', translation_map: 'scripts')
    end

    def generate_has_part
      lambda { |record, accumulator|
        url = record.xpath('/*/mods:relatedItem[@type="constituent"]/mods:location/mods:url', NS).map(&:text)
        title = record.xpath('/*/mods:relatedItem[@type="constituent"]/mods:titleInfo/mods:title', NS).map(&:text)

        if url.present?
          accumulator.concat(url)
        elsif title.present?
          accumulator.concat(title)
        end
      }
    end

    def generate_part_of
      lambda { |record, accumulator|
        url = record.xpath('/*/mods:relatedItem[@type="host"]/mods:location/mods:url', NS).map(&:text)
        title = record.xpath('/*/mods:relatedItem[@type="host"]/mods:titleInfo/mods:title', NS).map(&:text)

        if url.present?
          accumulator.concat(url)
        elsif title.present?
          accumulator.concat(title)
        end
      }
    end

    def generate_series
      lambda { |record, accumulator|
        url = record.xpath('/*/mods:relatedItem[@type="series"]/mods:location/mods:url', NS).map(&:text)
        title = record.xpath('/*/mods:relatedItem[@type="series"]/mods:titleInfo/mods:title', NS).map(&:text)

        if url.present?
          accumulator.concat(url)
        elsif title.present?
          accumulator.concat(title)
        end
      }
    end

    def generate_relation
      lambda { |record, accumulator|
        url = record.xpath('/*/mods:relatedItem[not(@*)]/mods:location/mods:url', NS).map(&:text)
        title = record.xpath('/*/mods:relatedItem[not(@*)]/mods:titleInfo/mods:title', NS).map(&:text)

        if url.present?
          accumulator.concat(url)
        elsif title.present?
          accumulator.concat(title)
        end
      }
    end

    # @param xpath [String] the xpath query expression
    def extract_mods(xpath, options = {})
      extract_xml(xpath, NS, options)
    end
  end
end
