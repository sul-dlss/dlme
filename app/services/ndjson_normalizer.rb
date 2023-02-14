# frozen_string_literal: true

# Splits and normalizes newline-delimited JSON
class NdjsonNormalizer
  # @param [String] ndjson a string consisting of one or more lines of newline-delimited JSON
  # @param [String] label how we refer to this file (e.g. path)
  # @return [Array<Hash>]
  def self.normalize(ndjson, label)
    new(ndjson, label).normalize
  end

  DELIMITER = "\n"

  attr_reader :ndjson, :label

  # @param [String] ndjson a string consisting of one or more lines of newline-delimited JSON
  # @param [String] label how we refer to this file (e.g. path)
  def initialize(ndjson, label)
    @ndjson = ndjson
    @label = label
  end

  # @return [Array<Hash>]
  def normalize
    ndjson.split(DELIMITER).compact_blank.map.with_index do |json_string, index|
      JSON.parse(json_string)
    rescue JSON::ParserError
      raise "Resource #{index + 1} in #{label} is invalid JSON: #{json_string}"
    end
  end
end
