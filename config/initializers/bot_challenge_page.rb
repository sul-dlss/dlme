# frozen_string_literal: true

# CIDR blocks treated as local/exempt from challenges
SAFELIST = [
  '171.64.0.0/14',
  '10.0.0.0/8',
  '172.16.0.0/12',
  '192.168.0.0/16'
].freeze

# rubocop:disable Layout/LineLength
Rails.application.config.to_prepare do
  # If disabled, no challenges will be issued
  BotChallengePage::BotChallengePageController.bot_challenge_config.enabled = ENV.fetch('TURNSTILE_ENABLED', 'false').downcase == 'true'

  # Get from CloudFlare Turnstile: https://www.cloudflare.com/application-services/products/turnstile/
  # Some testing keys are also available: https://developers.cloudflare.com/turnstile/troubleshooting/testing/
  BotChallengePage::BotChallengePageController.bot_challenge_config.cf_turnstile_sitekey = ENV.fetch('TURNSTILE_SITE_KEY', nil)
  BotChallengePage::BotChallengePageController.bot_challenge_config.cf_turnstile_secret_key = ENV.fetch('TURNSTILE_SECRET_KEY', nil)

  # Do the challenge "in place" on the page the user was on
  BotChallengePage::BotChallengePageController.bot_challenge_config.redirect_for_challenge = false

  # How long will a challenge success exempt a session from further challenges?
  # BotChallengePage::BotChallengePageController.bot_challenge_config.session_passed_good_for = 36.hours

  # Exempt async JS facet requests from the challenge. Someone really determined could fake
  # this header, but until we see that behavior, we'll allow it so the facet UI works.
  # Also exempt any IPs contained in the CIDR blocks in SAFELIST.
  BotChallengePage::BotChallengePageController.bot_challenge_config.allow_exempt = lambda do |controller, _config|
    (controller.is_a?(CatalogController) && controller.params[:action].in?(%w[facet]) && controller.request.headers['sec-fetch-dest'] == 'empty') ||
      SAFELIST.map { |cidr| IPAddr.new(cidr) }.any? { |range| controller.request.remote_ip.in?(range) }
  end

  # More configuration is available; see:
  # https://github.com/samvera-labs/bot_challenge_page/blob/main/app/models/bot_challenge_page/config.rb
end
# rubocop:enable Layout/LineLength
