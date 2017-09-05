# frozen_string_literal: true

require_relative 'extraction'

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

    def main_language
      tei_main_lang_xp = '/*/tei:teiHeader/tei:fileDesc/tei:sourceDesc/tei:msDesc/tei:msContents/tei:textLang/@mainLang'
      tei_lang_text_xp = '/*/tei:teiHeader/tei:fileDesc/tei:sourceDesc/tei:msDesc/tei:msContents/tei:textLang'
      first(
        extract_tei(tei_main_lang_xp, translation_map: ['marc_languages', default: '__passthrough__']),
        # the last one is separate to eventually pass fuzzy matching parameters
        extract_tei(tei_lang_text_xp, translation_map: ['marc_languages', default: '__passthrough__'])
      )
    end

    def other_languages
      tei_other_langs_xp = '/*/tei:teiHeader/tei:fileDesc/tei:sourceDesc/tei:msDesc/tei:msContents/tei:textLang/@otherLangs'
      new_pipeline = Macros::Extraction::TransformPipeline.new(translation_map: 'marc_languages')
      lambda do |record, accumulator|
        node = record.xpath(tei_other_langs_xp, NS).first
        accumulator.concat(new_pipeline.transform(node.value.split(' '))) if node
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
