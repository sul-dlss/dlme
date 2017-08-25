# frozen_string_literal: true

module Macros
  # Macros for extracting values from CSV rows
  module MetCsv
    # @param header_or_index [String] the field header or index to accumulate

    DISPLAY_NAME = 'Artist Display Name'
    SUFFIX = 'Artist Suffix'
    BEGIN_DATE = 'Artist Begin Date'
    END_DATE = 'Artist End Date'
    OBJECT_BEGIN_DATE = 'Object Begin Date'
    OBJECT_END_DATE = 'Object End Date'
    ROLE = 'Artist Role'
    BIO = 'Artist Display Bio'
    CLASSIFICATION = 'Classification'
    PUBLIC_DOMAIN = 'Is Public Domain'
    DEPARTMENT = 'Department'
    REPOSITORY = 'Repository'

    def met_thumbnail
      lambda do |_record, accumulator, context|
        ident = context.output_hash['id'].first
        image_json = fetch_met_thumbnail(ident)

        return if image_json.blank?
        # Some records e.g. 321624, don't return any results
        result = image_json['results'].first
        if result
          thumbnail = result['webImageUrl']
          accumulator << transform_values(context, 'wr_id' => literal(thumbnail))
        end
      end
    end

    def generate_creator
      lambda do |row, accumulator, _context|
        accumulator << [row[DISPLAY_NAME], row[SUFFIX], artist_role_bio(row)].select(&:present?).join(', ')
      end
    end

    def artist_date_range(row)
      [row[BEGIN_DATE], row[END_DATE]].select(&:present?).join(' - ')
    end

    def artist_role_bio(row)
      role = [row[ROLE], row[BIO]].select(&:present?).join(' ; ')
      artist_info = artist_date_range(row)
      artist_info += " (#{role})" if role.present?
      artist_info
    end

    def generate_object_date
      lambda do |row, accumulator, _context|
        object_date = row[OBJECT_BEGIN_DATE] unless row[OBJECT_BEGIN_DATE].to_s.empty?
        object_date = "#{object_date} - #{row[OBJECT_END_DATE]}" unless row[OBJECT_END_DATE].to_s.empty?
        accumulator << object_date
      end
    end

    def edm_type
      lambda do |row, accumulator, _context|
        accumulator << '3D' unless row[CLASSIFICATION].empty?
      end
    end

    def public_domain
      lambda do |row, accumulator, _context|
        accumulator << 'Public Domain' if row[PUBLIC_DOMAIN] == 'True'
        accumulator << 'Not Public Domain' if row[PUBLIC_DOMAIN] == 'False'
      end
    end

    # This overrides the dlme macro of the same name
    def data_provider
      lambda do |row, accumulator, _context|
        accumulator << [row['Department'], row['Repository']].select(&:present?).join(', ')
      end
    end

    def fetch_met_thumbnail(id)
      uri = URI("http://www.metmuseum.org/api/Collection/additionalImages?crdId=#{id}")
      resp = Faraday.get uri
      ::JSON.parse(resp.body) if resp.success?
    end
  end
end
