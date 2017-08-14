# frozen_string_literal: true

module Macros
  # Macros for extracting Stanford Specific MODS values from Nokogiri documents
  module Stanford
    def grab_sul_iiif_links(manifest)
      result = Net::HTTP.get(URI.parse(manifest))
      process_iiif_json(result)
    rescue
      nil
    end

    def process_iiif_thumbnail(result)
      resp = JSON.parse(result)
      resp['thumbnail']['@id']
    rescue JSON::ParserError
      nil
    end

    def process_iiif_thumbnail_service(result)
      resp = JSON.parse(result)
      resp['thumbnail']['service']['@id']
    rescue JSON::ParserError
      nil
    end

    def process_iiif_thumbnail_protocol(result)
      resp = JSON.parse(result)
      resp['thumbnail']['service']['profile']
    rescue JSON::ParserError
      nil
    end

    def process_iiif_thumbnail_conforms_to(result)
      resp = JSON.parse(result)
      iiif_service_conforms_to(resp['thumbnail']['service']['profile'])
    rescue JSON::ParserError
      nil
    end

    def process_iiif_sequences(result)
      resp = JSON.parse(result)
      iiif_service(resp['sequences'])
      iiif_service_conforms_to(resp)
    rescue JSON::ParserError
      nil
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
        literal('http://iiif.io/api/image/')
      elsif thumbnail_service_profile.include? 'http://iiif.io/api/auth/'
        literal('http://iiif.io/api/auth/')
      elsif thumbnail_service_profile.include? 'http://iiif.io/api/presentation/'
        literal('http://iiif.io/api/presentation/')
      elsif thumbnail_service_profile.include? 'http://iiif.io/api/search/'
        literal('http://iiif.io/api/search/')
      end
    end

    def iiif_protocol(thumbnail_service_profile)
      # Using the thumbnail service profile for now
      to_field 'service_implements', literal(thumbnail_service_profile)
    end
  end
end
