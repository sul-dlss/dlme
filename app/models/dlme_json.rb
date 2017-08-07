# frozen_string_literal: true

# Model to represent the intermediate representation (in JSON) of a DLME object
class DlmeJson < Spotlight::Resource
  self.document_builder_class = DlmeJsonResourceBuilder
  validate :valid_json?

  # @raise [JSON::ParserError] if the json is not parsable
  def json
    @json ||= JSON.parse(data[:json])
  end

  private

  def valid_json?
    json
    true
  rescue JSON::ParserError
    errors.add(:json, 'Invalid JSON')
  end
end
