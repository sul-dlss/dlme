# frozen_string_literal: true

module Macros
  # Macros for extracting Stanford Specific MODS values from Nokogiri documents
  module Stanford
    NS = { mods: 'http://www.loc.gov/mods/v3',
           rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
           dc: 'http://purl.org/dc/elements/1.1/' }.freeze
    # SOURCE SPECIFIC METHODS
    # Macros for extracting Stanford-specific values from Nokogiri documents
    def generate_sul_manifest
      lambda { |record, accumulator, context|
        druid = generate_druid(record, context)
        # eventually add a test that calls IIIF service to check
        if druid.present? && druid?(druid.chomp('druid:'))
          manifest = "https://purl.stanford.edu/#{druid}/iiif/manifest"
          accumulator << manifest
          grab_sul_iiif_links(manifest)
          generate_sul_shown_at(druid)
        end
      }
    end

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

    def generate_sul_shown_at(druid)
      to_field 'agg_is_shown_at' do |record, accumulator|
        mods_url = record.xpath('/*/mods:location/mods:url', NS).map(&:text)
        accumulator.concat(mods_url) if mods_url.present?
        accumulator << "https://purl.stanford.edu/#{druid}"
      end
    end

    def grab_sul_iiif_links(manifest)
      result = Net::HTTP.get(URI.parse(manifest))
      process_iiif_json(result)
    rescue
      nil
    end

    def process_iiif_json(result)
      resp = JSON.parse(result)
      iiif_service(resp['sequences'])
      generate_sul_preview(resp['thumbnail']['@id'])
      iiif_protocol(resp['thumbnail']['service']['profile'])
      iiif_service_conforms_to(resp['thumbnail']['service']['profile'])
    rescue JSON::ParserError
      nil
    end

    def generate_sul_preview(thumbnail_uri)
      to_field 'agg_preview', literal(thumbnail_uri)
    end

    def iiif_service(sequences)
      to_field 'wr_has_service' do |accumulator|
        sequences.each do |sequence|
          sequence['canvases'].each do |canvas|
            canvas['images'].each do |image|
              accumulator << image['resource']['service']['id']
            end
          end
        end
      end
    end

    def iiif_service_conforms_to(thumbnail_service_profile)
      # Using the thumbnail service profile for now
      if thumbnail_service_profile.include? 'http://iiif.io/api/image/'
        to_field 'service_conforms_to', literal('http://iiif.io/api/image/')
      elsif thumbnail_service_profile.include? 'http://iiif.io/api/auth/'
        to_field 'service_conforms_to', literal('http://iiif.io/api/auth/')
      elsif thumbnail_service_profile.include? 'http://iiif.io/api/presentation/'
        to_field 'service_conforms_to', literal('http://iiif.io/api/presentation/')
      elsif thumbnail_service_profile.include? 'http://iiif.io/api/search/'
        to_field 'service_conforms_to', literal('http://iiif.io/api/search/')
      end
    end

    def iiif_protocol(thumbnail_service_profile)
      # Using the thumbnail service profile for now
      to_field 'service_implements', literal(thumbnail_service_profile)
    end
  end
end
