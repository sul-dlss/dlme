# frozen_string_literal: true

# service class for removing a resource or multiple resources
class ResourceRemover
  def self.remove_all_resources
    new.remove_all_resources
  end

  # @return [Integer] the number of records removed
  def remove_all_resources
    # we could run a count query, but if there are a ton of records, actual deleted count could
    # exceed initial count, because find_each runs in batches non-transactionally.
    removal_count = 0
    Spotlight::Resource.find_each do |resource|
      ResourceRemover.remove_resource(resource: resource)
      removal_count += 1
    end
    removal_count
  end

  def self.remove_resource(resource:)
    new.remove_resource(resource: resource)
  end

  # @param [Spotlight::Resource] resource to be un-indexed and destroyed
  def remove_resource(resource:)
    # This approach will work for DLME where we only have one exhibit, but
    # will need to be made more complicated for Spotlight in general because
    # one resource could be part of more than one exhibit.
    blacklight_solr.delete_by_query(
      "{!terms f=#{Spotlight::Engine.config.resource_global_id_field}}#{resource.to_global_id}"
    )
    blacklight_solr.commit
    resource.destroy
  end

  private

  def blacklight_solr
    @blacklight_solr ||= RSolr.connect(connection_config.merge(adapter: connection_config[:http_adapter]))
  end

  def connection_config
    Blacklight.connection_config
  end
end
