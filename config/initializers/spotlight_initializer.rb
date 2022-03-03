require 'open-uri'

# ==> User model
# Note that your chosen model must include Spotlight::User mixin
# Spotlight::Engine.config.user_class = '::User'

# ==> Blacklight configuration
# Spotlight uses this upstream configuration to populate settings for the curator
# Spotlight::Engine.config.catalog_controller_class = '::CatalogController'
# Spotlight::Engine.config.default_blacklight_config = nil

# ==> Appearance configuration
Spotlight::Engine.config.exhibit_main_navigation = [:curated_features, :browse, :about, :statistics]
# Spotlight::Engine.config.resource_partials = [
#   'spotlight/resources/external_resources_form',
#   'spotlight/resources/upload/form',
#   'spotlight/resources/csv_upload/form',
#   'spotlight/resources/json_upload/form'
# ]
Spotlight::Engine.config.external_resources_partials += ['dlme_jsons/irform']
# Spotlight::Engine.config.default_browse_index_view_type = :gallery
Spotlight::Engine.config.default_contact_email = Settings.contact.email

# ==> Solr configuration
# Spotlight::Engine.config.writable_index = true
# Spotlight::Engine.config.solr_batch_size = 20
# Spotlight::Engine.config.filter_resources_by_exhibit = true
# Spotlight::Engine.config.autocomplete_search_field = 'autocomplete'
Spotlight::Engine.config.iiif_manifest_field = 'agg_is_shown_at.wr_is_referenced_by_ssi'
Spotlight::Engine.config.default_autocomplete_params = {
  qf: 'id^1000 cho_title_tsim^100 id_ng cho_title_ng',
  fl: 'id cho_title* agg_preview.wr_id_ssim agg_is_shown_at.wr_is_referenced_by_ssi',
  facet: 'false',
  stats: 'false'
}

# Solr field configurations
# Spotlight::Engine.config.solr_fields.prefix = ''.freeze
# Spotlight::Engine.config.solr_fields.boolean_suffix = '_bsi'.freeze
# Spotlight::Engine.config.solr_fields.string_suffix = '_ssim'.freeze
# Spotlight::Engine.config.solr_fields.text_suffix = '_tesim'.freeze
# Spotlight::Engine.config.resource_global_id_field = :"#{config.solr_fields.prefix}spotlight_resource_id#{config.solr_fields.string_suffix}"
# Spotlight::Engine.config.full_image_field = :full_image_url_ssm
# Spotlight::Engine.config.thumbnail_field = :thumbnail_url_ssm

# ==> Uploaded item configuration
# Spotlight::Engine.config.upload_fields = [
#   OpenStruct.new(field_name: :spotlight_upload_description_tesim, label: 'Description', form_field_type: :text_area),
#   OpenStruct.new(field_name: :spotlight_upload_attribution_tesim, label: 'Attribution'),
#   OpenStruct.new(field_name: :spotlight_upload_date_tesim, label: 'Date')
# ]
Spotlight::Engine.config.upload_title_field = Spotlight::UploadFieldConfig.new(
  solr_fields: %w(cho_title_tsim sortable_cho_title_ssi spotlight_upload_title_tesim),
  field_name: :title,
  label: -> { I18n.t(:'spotlight.search.fields.title') }
)

# Spotlight::Engine.config.uploader_storage = :file
# Spotlight::Engine.config.allowed_upload_extensions = %w(jpg jpeg png)

# Spotlight::Engine.config.featured_image_thumb_size = [400, 300]
# Spotlight::Engine.config.featured_image_square_size = [400, 400]

# ==> Google Analytics integration
if Settings.analytics.pkcs12_key && Settings.analytics.pkcs12_key_path
  File.open(Settings.analytics.pkcs12_key_path, "wb") do |file|
    handler = Settings.analytics.pkcs12_key.match?(URI.regexp) ? URI : File
    handler.open(Settings.analytics.pkcs12_key, "rb") do |read_file|
      file.write(read_file.read)
    end
  end
end

# Spotlight::Engine.config.analytics_provider = nil
Spotlight::Engine.config.ga_pkcs12_key_path = Settings.analytics.pkcs12_key_path
Spotlight::Engine.config.ga_web_property_id = Settings.analytics.web_property_id
Spotlight::Engine.config.ga_email = Settings.analytics.email
# Spotlight::Engine.config.ga_analytics_options = {}
# Spotlight::Engine.config.ga_page_analytics_options = config.ga_analytics_options.merge(limit: 5)

Spotlight::Engine.config.routes.solr_documents = {
  constraints: { id: %r{.+} }
}

Spotlight::Engine.config.exports[:resources] = false

ActiveSupport::Reloader.to_prepare do
  Spotlight::Etl::Context.error_reporter = lambda do |pipeline, exception, data|
    Honeybadger.notify(exception, context: data, tags: ['etl'])
  end
end
