# frozen_string_literal: true

# Model to represent the intermediate representation (in JSON) of a DLME object
class DlmeJson < Spotlight::Resource
  self.document_builder_class = DlmeJsonResourceBuilder

  def json
    @json ||= JSON.parse(data[:json])
  end
end
