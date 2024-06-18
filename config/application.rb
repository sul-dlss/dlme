require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Dlme
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    config.middleware.use Rack::Attack

    unless Rails.env.production?
      config.slowpoke.timeout = 60
    end

    Recaptcha.configure do |config|
      config.site_key = ENV.fetch('RECAPTCHA_SITE_KEY', '6Lc6BAAAAAAAAChqRbQZcn_yyyyyyyyyyyyyyyyy')
      config.secret_key = ENV.fetch('RECAPTCHA_SECRET_KEY', '6Lc6BAAAAAAAAKN3DRm6VA_xxxxxxxxxxxxxxxxx')
    end
  end
end
