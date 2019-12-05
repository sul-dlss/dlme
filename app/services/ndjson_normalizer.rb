# frozen_string_literal: true

# Splits and normalizes newline-delimited JSON
class NdjsonNormalizer
  # @param [String] ndjson a string consisting of one or more lines of newline-delimited JSON
  # @param [String] url URL from which the json was fetched
  # @return [Array<Hash>]
  def self.normalize(ndjson, url)
    new(ndjson, url).normalize
  end

  DELIMITER = "\n"

  attr_reader :ndjson, :url

  # @param [String] ndjson a string consisting of one or more lines of newline-delimited JSON
  # @param [String] url URL from which the json was fetched
  def initialize(ndjson, url)
    @ndjson = ndjson
    @url = url
  end

  # @return [Array<Hash>]
  def normalize
    ndjson.split(DELIMITER).reject(&:blank?).map.with_index do |json_string, index|
      JSON.parse(json_string)
    rescue JSON::ParserError
      raise "Resource #{index + 1} in #{url} is invalid JSON: #{json_string}"
    end
  end
end
