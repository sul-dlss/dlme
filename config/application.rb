require_relative "boot"

# libvips on the deploy hosts predates 8.13, so it lacks vips_block_untrusted_set
# and ruby-vips never defines Vips.block_untrusted. Active Storage 8.1 raises at
# engine load when that method is missing. Nothing here reaches libvips: riiif
# defaults use_vips to false, and variant_processor below is :disabled.
# This must run before rails/all, because the raise happens in a class body.
# A host with no libvips at all needs no shim, hence the rescue.
# Remove all of this after the hosts get libvips >= 8.13.
begin
  require "ruby-vips"
  Vips.define_singleton_method(:block_untrusted) { |_state| nil } unless Vips.respond_to?(:block_untrusted)
rescue LoadError
  # No libvips on this host, so Active Storage skips the check on its own.
end

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Dlme
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w(assets tasks))

    # We don't use Active Storage variants.
    # Disabling dodges some libvips checks.
    config.active_storage.variant_processor = :disabled

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    unless Rails.env.production?
      config.slowpoke.timeout = 60
    end

    Recaptcha.configure do |config|
      config.site_key = ENV.fetch('RECAPTCHA_SITE_KEY', '6Lc6BAAAAAAAAChqRbQZcn_yyyyyyyyyyyyyyyyy')
      config.secret_key = ENV.fetch('RECAPTCHA_SECRET_KEY', '6Lc6BAAAAAAAAKN3DRm6VA_xxxxxxxxxxxxxxxxx')
    end
  end
end
