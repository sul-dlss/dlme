# frozen_string_literal: true

# Catalog extension for configuring display fields that pull from locale-specific Solr fields
module MultilingualLocaleAwareField
  def lang_config
    @lang_config ||= {
      'ar' => [%w[ar-Arab ar-Latn], default: (%w[en none] + Settings.acceptable_bcp47_codes).uniq],
      'en' => ['en', default: (%w[ar-Arab ar-Latn none] + Settings.acceptable_bcp47_codes).uniq]
    }.with_indifferent_access
  end

  def multilingual_locale_aware_field(field_prefix, suffix = 'ssim')
    {
      pattern: "#{field_prefix}.%<lang>s_#{suffix}",
      values: lambda do |field_config, document|
        pref_langs, options = lang_config[I18n.locale]

        values = Array.wrap(pref_langs).flatten.map do |lang|
          subfield_config = field_config.merge(field: format(field_config.pattern, lang: lang), values: nil)
          Blacklight::FieldRetriever.new(document, subfield_config).fetch
        end

        if values.none?(&:any?)
          values = Array.wrap(options[:default]).flatten.map do |lang|
            subfield_config = field_config.merge(field: format(field_config.pattern, lang: lang), values: nil)
            Blacklight::FieldRetriever.new(document, subfield_config).fetch
          end
        end

        if values.none?(&:any?)
          subfield_config = field_config.merge(field: "#{field_prefix}_#{suffix}", values: nil)
          values = [Blacklight::FieldRetriever.new(document, subfield_config).fetch]
        end

        if field_config.first
          values.find(&:any?)
        else
          values.flatten
        end
      end
    }
  end
end
