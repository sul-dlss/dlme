# frozen_string_literal: true

module Macros
  # DLME helpers for traject mappings
  module Extraction
    def self.apply_extraction_options(result, options = {})
      TransformPipeline.new(options).transform(result)
    end

    # Pipeline for transforming extracted values into normalized values
    class TransformPipeline
      attr_reader :options

      def initialize(options)
        @options = options
      end

      def transform(values)
        options.inject(values) { |memo, (step, params)| public_send(step, memo, params) }
      end

      def split(values, splitter)
        values.flat_map do |v|
          v.split(splitter)
        end
      end

      def trim(values, _)
        values.map(&:strip)
      end

      def append(values, append_string)
        values.flat_map do |v|
          "#{v}#{append_string}"
        end
      end

      def replace(values, options)
        values.flat_map do |v|
          v.gsub(options[0], options[1])
        end
      end

      def insert(values, insert_string)
        values.flat_map do |v|
          insert_string.gsub('%s', v)
        end
      end

      def translation_map(values, maps)
        translation_map = Traject::TranslationMap.new(*Array(maps))
        # without overwriting (further) translation map, could add
        # fuzzy match method here after pulling array out of TM
        values = Array(values).map(&:downcase)
        translation_map.translate_array values
      end

      def default(values, default_value)
        if values.present?
          values
        else
          default_value
        end
      end
    end
  end
end
