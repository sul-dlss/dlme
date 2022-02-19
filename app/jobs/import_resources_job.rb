# frozen_string_literal: true

# Load JSON resources from a local file, persist them, and index them
class ImportResourcesJob < AddResourcesJob
  private

  def get_resources(location)
    contents = File.read(location)
    NdjsonNormalizer.normalize(contents, location)
  end
end
