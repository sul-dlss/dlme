# frozen_string_literal: true

# Encapsulates the logic for parsing and writing an NDJSON body during harvesting
class NdjsonParse
  attr_reader :error

  def initialize(body)
    @body = body
    @error = nil
  end

  def valid?
    if @body.blank?
      @error = :no_body
    elsif NdjsonNormalizer.new(@body, filepath).any_duplicate_identifiers?
      @error = :duplicate_ids
    end
    error.nil?
  rescue RuntimeError
    @error = :invalid_json
    false
  end

  def write
    File.write(filepath, @body)
  end

  def filepath
    File.join(Settings.data_dir, filename)
  end

  def filename
    "#{Time.current.strftime('%Y%m%d%H%M')}.ndjson"
  end
end
