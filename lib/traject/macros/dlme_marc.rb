# frozen_string_literal: true

module Macros
  # Macros that change some of Traject's MARC behaviors for the sake of DLME.
  module DlmeMarc
    def extract_role(marc_field, role)
      lambda do |record, accumulator|
        record.each_by_tag(marc_field) do |field|
          if role == 'creator'
            accumulator.concat [field.value] if %w[creator author cre aut].include?(field['e'])
          elsif role == 'contributor'
            accumulator.concat [field.value] unless %w[creator author cre aut].include?(field['e'])
          end
        end
      end
    end

    def marc_type_to_edm
      lambda { |record, accumulator, _context|
        leader06 = record.leader.byteslice(6)
        edm_types = Macros::Extraction.apply_extraction_options(leader06, translation_map: 'types')
        accumulator.concat(edm_types)
      }
    end
  end
end
