# frozen_string_literal: true

module Macros
  # Macros for extracting MODS values from Nokogiri documents
  module Mods
    NS = { mods: 'http://www.loc.gov/mods/v3' }.freeze

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

    # @param xpath [String] the xpath query expression
    def extract_mods(xpath)
      extract_xml(xpath, NS)
    end
  end
end
