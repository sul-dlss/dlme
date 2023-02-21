# frozen_string_literal: true

# Encapsulates the logic for validating an NDJSON file upload during harvesting
class NdjsonUpload
  attr_reader :error

  def initialize(url)
    @url = url
    @error = nil
  end

  def valid?
    if @url.blank?
      @error = :no_url
    elsif !File.exist?(filepath)
      @error = :file_not_found
    elsif NdjsonNormalizer.new(body, filename).any_duplicate_identifiers?
      @error = :duplicate_ids
    end

    error.nil?
  end

  def body
    File.read(filepath)
  end

  def filepath
    File.join(Settings.data_dir, filename)
  end

  def filename
    ActiveStorage::Filename.new(@url).sanitized
  end
end
