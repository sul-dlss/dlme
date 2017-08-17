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

    def generate_mods_id
      lambda { |record, accumulator, context|
        identifier = select_identifier(record, context)

        if identifier.present?
          accumulator << if identifier.include? context.settings.fetch('inst_id')
                           identifier
                         elsif identifier.include? context.settings.fetch('inst_id')
                           context.settings.fetch('inst_id') + '_' + identifier
                         end
        end
      }
    end

    # rubocop:disable Metrics/AbcSize
    def select_identifier(record, context)
      if record.xpath('/*/mods:identifier', NS).map(&:text).present?
        record.xpath('/*/mods:identifier', NS).map(&:text)
      elsif context.settings.key?('command_line.filename')
        identifier = context.settings.fetch('command_line.filename')
        File.basename(identifier, File.extname(identifier))
      elsif context.settings.key?('identifier')
        identifier = context.settings.fetch('identifier')
        File.basename(identifier, File.extname(identifier))
      end
    end
    # rubocop:enable Metrics/AbcSize

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
      extract_mods('/*/mods:language/mods:languageTerm', translation_map: 'languages')
    end

    def normalize_script
      extract_mods('/*/mods:language/mods:scriptTerm', translation_map: 'scripts')
    end

    # @param xpath [String] the xpath query expression
    def extract_mods(xpath, options = {})
      extract_xml(xpath, NS, options)
    end
  end
end
