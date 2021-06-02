# frozen_string_literal: true

# Load JSON resources from a url, persist them, and index them
class DeleteResourcesJob < ApplicationJob
  queue_as :default

  def perform(url, exhibit)
    logger.info("Begin delete resources job from #{url}.")

    resp = Faraday.get(url)

    resources = NdjsonNormalizer.normalize(resp.body, url)
    resources.each do |item|
      remove_resource(item: item, exhibit: exhibit)
    end

    logger.info("#{resources.count} records were removed from #{url}.")
  end

  private

  def remove_resource(item:, exhibit:)
    resource = DlmeJson.find_by(url: item['id'], exhibit: exhibit)
    return unless resource

    # This approach will work for DLME where we only have one exhibit, but
    # will need to be made more complicated for Spotlight in general because
    # one resource could be part of more than one exhibit.
    blacklight_solr.delete_by_query(
      "{!terms f=#{Spotlight::Engine.config.resource_global_id_field}}#{resource.to_global_id}"
    )
    blacklight_solr.commit
    resource.destroy
  end

  def blacklight_solr
    @blacklight_solr ||= RSolr.connect(connection_config.merge(adapter: connection_config[:http_adapter]))
  end

  def connection_config
    Blacklight.connection_config
  end
end
