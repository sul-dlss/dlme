# frozen_string_literal: true

# Model to represent the intermediate representation (in JSON) of a DLME object
class DlmeJson < Spotlight::Resource
  self.document_builder_class = DlmeJsonResourceBuilder
  validate :valid_json_syntax?
  validate :valid_schema?
  validates :url, uniqueness: { scope: :exhibit_id }

  store :data, accessors: %i[json metadata]

  # @return [Hash]
  # @raise [JSON::ParserError] if the json is not parsable
  def json
    @json ||= JSON.parse(super)
  end

  def metadata
    super || {}
  end

  private

  def valid_json_syntax?
    json
    true
  rescue JSON::ParserError
    errors.add(:json, 'Invalid JSON')
  end

  def valid_schema?
    # If not coerced to a hash, #errors returns a Dry::Schema::MessageSet. Doing
    # this to provide looser coupling.
    schema_errors_hash = DlmeJsonSchema.call(json).errors.to_h
    return if schema_errors_hash.empty?

    errors.add(:json, squash_errors(schema_errors_hash))
  rescue JSON::ParserError
    false
  end

  # Given a hash with keys as strings and values as either arrays or hashes
  def squash_errors(h)
    h.map do |k, v|
      if v.is_a? Hash
        "within '#{k}', #{squash_errors(v)}"
      else
        "'#{k}' #{v.to_sentence}"
      end
    end.join('. ')
  end
end
