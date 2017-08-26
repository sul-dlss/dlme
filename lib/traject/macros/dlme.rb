# frozen_string_literal: true

module Macros
  # DLME helpers for traject mappings
  module DLME
    # construct a structured hash using values extracted using traject
    def transform_values(context, hash)
      hash.transform_values do |lambdas|
        accumulator = []
        Array(lambdas).each do |lambda|
          lambda.call(context.source_record, accumulator, context)
        end
        accumulator
      end
    end

    def self.apply_extraction_options(result, options = {})
      result = result.flat_map { |s| s.split(options[:split]) } if options.key?(:split)
      result = result.collect(&:strip) if options.key?(:trim)
      result = apply_translation(result, options) if options.key?(:translation_map)
      result = options[:default] if options.key?(:default) && result.empty?
      result
    end

    def self.apply_translation(values, options)
      translation_map = Traject::TranslationMap.new(*Array(options[:translation_map]))
      # without overwriting (further) translation map, could add
      # fuzzy match method here after pulling array out of TM
      values = Array(values).map(&:downcase)
      translation_map.translate_array values
    end

    # try a bunch of macros and short-circuit after one returns values
    def first(*macros)
      lambda do |record, accumulator, context|
        macros.lazy.map do |lambda|
          lambda.call(record, accumulator, context)
        end.reject(&:blank?).first
      end
    end

    # only accumulate values if a condition is met
    def conditional(condition, lambda)
      lambda do |record, accumulator, context|
        if condition.call(record, context)
          lambda.call(record, accumulator, context)
        end
      end
    end

    def provider
      from_settings('agg_provider')
    end

    def data_provider
      from_settings('agg_data_provider')
    end

    def from_settings(field)
      lambda { |_record, accumulator, context|
        accumulator << context.settings.fetch(field)
      }
    end

    def identifier_with_prefix(context, identifier)
      return identifier unless context.settings.key?('inst_id')

      prefix = context.settings.fetch('inst_id') + '_'

      if identifier.starts_with? prefix
        identifier
      else
        prefix + identifier
      end
    end

    def default_identifier(context)
      identifier = if context.settings.key?('command_line.filename')
                     context.settings.fetch('command_line.filename')
                   elsif context.settings.key?('identifier')
                     context.settings.fetch('identifier')
                   end
      File.basename(identifier, File.extname(identifier)) if identifier.present?
    end
  end
end
