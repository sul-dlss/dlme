# frozen_string_literal: true

module Macros
  # Macros for extracting Stanford Specific MODS values from Nokogiri documents
  module Stanford
    def grab_sul_iiif_links(manifest)
      manifest = Net::HTTP.get(URI.parse(manifest))
      JSON.parse(manifest)
    rescue
      nil
    end

    def process_iiif_thumbnail(manifest_json)
      manifest_json['thumbnail']['@id']
    rescue JSON::ParserError
      nil
    end

    def process_iiif_thumbnail_service(manifest_json)
      manifest_json['thumbnail']['service']['@id']
    rescue JSON::ParserError
      nil
    end

    def process_iiif_thumbnail_protocol(manifest_json)
      manifest_json['thumbnail']['service']['profile']
    rescue JSON::ParserError
      nil
    end

    def process_iiif_thumbnail_conforms_to(manifest_json)
      iiif_service_conforms_to(manifest_json['thumbnail']['service']['profile'])
    rescue JSON::ParserError
      nil
    end

    def process_iiif_sequences(manifest_json)
      manifest_json['sequences'].first['canvases'].first['images'].first['resource']['@id']
    rescue JSON::ParserError
      nil
    end

    def process_iiif_sequences_service_id(manifest_json)
      manifest_json['sequences'].first['canvases'].first['images'].first['resource']['service']['@id']
    rescue JSON::ParserError
      nil
    end

    def process_iiif_sequences_service_profile(manifest_json)
      manifest_json['sequences'].first['canvases'].first['images'].first['resource']['service']['profile']
    rescue JSON::ParserError
      nil
    end

    def process_iiif_sequences_conforms_to(manifest_json)
      profile = manifest_json['sequences'].first['canvases'].first['images'].first['resource']['service']['profile']
      iiif_service_conforms_to(profile)
    rescue JSON::ParserError
      nil
    end

    def iiif_service_conforms_to(service_profile)
      # Using the thumbnail service profile for now
      if service_profile.include? 'http://iiif.io/api/image/'
        literal('http://iiif.io/api/image/')
      elsif service_profile.include? 'http://iiif.io/api/auth/'
        literal('http://iiif.io/api/auth/')
      elsif service_profile.include? 'http://iiif.io/api/presentation/'
        literal('http://iiif.io/api/presentation/')
      elsif service_profile.include? 'http://iiif.io/api/search/'
        literal('http://iiif.io/api/search/')
      end
    end

    def iiif_protocol(thumbnail_service_profile)
      # Using the thumbnail service profile for now
      to_field 'service_implements', literal(thumbnail_service_profile)
    end
  end
end
