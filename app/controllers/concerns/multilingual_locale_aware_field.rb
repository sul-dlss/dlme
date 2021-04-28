# frozen_string_literal: true

# Catalog extension for configuring display fields that pull from locale-specific Solr fields
module MultilingualLocaleAwareField
  def lang_config
    @lang_config ||= {
      'ar' => ['ar-Arab', default: (sorted_locales(Settings.acceptable_bcp47_codes, '-Arab') + %w[none]).uniq],
      'en' => ['en', default: (sorted_locales(Settings.acceptable_bcp47_codes, '-Latn') + %w[none]).uniq]
    }.with_indifferent_access
  end

  def multilingual_locale_aware_field(field_prefix, suffix = 'ssim')
    {
      pattern: "#{field_prefix}.%<lang>s_#{suffix}",
      values: lambda do |field_config, document, view_context|
        pref_langs, options = lang_config[I18n.locale]

        values = Array.wrap(pref_langs).flatten.map do |lang|
          subfield_config = field_config.merge(field: format(field_config.pattern, lang: lang), values: nil)
          Blacklight::FieldRetriever.new(document, subfield_config, view_context).fetch
        end

        if values.none?(&:any?)
          values = Array.wrap(options[:default]).flatten.map do |lang|
            subfield_config = field_config.merge(field: format(field_config.pattern, lang: lang), values: nil)
            Blacklight::FieldRetriever.new(document, subfield_config, view_context).fetch
          end
        end

        if values.none?(&:any?)
          subfield_config = field_config.merge(field: "#{field_prefix}_#{suffix}", values: nil)
          values = [Blacklight::FieldRetriever.new(document, subfield_config, view_context).fetch]
        end

        if field_config.first
          values.find(&:any?)
        else
          values.flatten
        end
      end
    }
  end

  private

  def sorted_locales(locales, sort_by)
    locales.sort_by.with_index do |locale, index|
      if locale.include?(sort_by)
        index - locales.length
      else
        index
      end
    end
  end
end
