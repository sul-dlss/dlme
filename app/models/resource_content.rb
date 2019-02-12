# frozen_string_literal: true

# Persists data using content addressable storage
class ResourceContent < ApplicationRecord
  # If we don't already have a resource with the given multihash, create one
  # from the content yielded by the block
  # TODO: should we validate content has the correct digest?
  # @return [void]
  def self.persist(multihash)
    return if ResourceContent.where(multihash: multihash).exists?

    ResourceContent.create!(multihash: multihash, body: yield)
  end
end
