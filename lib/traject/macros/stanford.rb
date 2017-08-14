# frozen_string_literal: true

require 'traject/iiif'

module Macros
  # Macros for extracting Stanford Specific MODS values from Nokogiri documents
  module Stanford
    NS = { mods: 'http://www.loc.gov/mods/v3',
           rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
           dc: 'http://purl.org/dc/elements/1.1/' }.freeze

    def generate_druid(record, context)
      if context.settings.fetch('identifier')
        identifier = context.settings.fetch('identifier').dup
        identifier.sub! 'stanford_', ''
      else
        record.xpath('/*/mods:identifier', NS).map(&:text)
      end
    end

    def druid?(identifier)
      identifier =~ /([a-z]{2})(\d{3})([a-z]{2})(\d{4})\z/
    end

    # This is a URL for the Digital Object in its information context
    def generate_sul_shown_at(druid)
      mods_url = record.xpath('/*/mods:location/mods:url', NS).map(&:text)
      if druid.preset?
        "https://purl.stanford.edu/#{druid}"
      elsif mods_url.present?
        mods_url.first
    end
  end
end
