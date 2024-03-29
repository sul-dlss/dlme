require 'i18n/backend/active_record'

Rails.application.config.to_prepare do
  if ENV['NO_DATABASE'].blank? && Translation.table_exists?
    ##
    # Sets up the new Spotlight Translation backend, backed by ActiveRecord. To
    # turn on the ActiveRecord backend, uncomment the following lines.

    I18n.backend = I18n::Backend::ActiveRecord.new
    I18n::Backend::ActiveRecord.send(:include, I18n::Backend::Memoize)
    I18n::Backend::Simple.send(:include, I18n::Backend::Memoize)
    I18n::Backend::Simple.send(:include, I18n::Backend::Pluralization)

    I18n.backend = I18n::Backend::Chain.new(I18n.backend, I18n::Backend::Simple.new)
  end
end
