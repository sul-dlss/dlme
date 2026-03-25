# frozen_string_literal: true

# CIDR blocks treated as local/exempt from challenges
SAFELIST = [
  '171.64.0.0/14',
  '10.0.0.0/8',
  '172.16.0.0/12',
  '192.168.0.0/16'
].freeze

# rubocop:disable Layout/LineLength
BotChallengePage.configure do |config|
  # If disabled, no challenges will be issued
  config.enabled = ENV.fetch('TURNSTILE_ENABLED', 'false').downcase == 'true'

  # Get from CloudFlare Turnstile: https://www.cloudflare.com/application-services/products/turnstile/
  # Some testing keys are also available: https://developers.cloudflare.com/turnstile/troubleshooting/testing/
  config.cf_turnstile_sitekey = ENV.fetch('TURNSTILE_SITE_KEY', nil)
  config.cf_turnstile_secret_key = ENV.fetch('TURNSTILE_SECRET_KEY', nil)

  # Do the challenge "in place" on the page the user was on
  config.redirect_for_challenge = false

  # How long will a challenge success exempt a session from further challenges?
  # config.session_passed_good_for = 36.hours

  # Exempt async JS facet requests from the challenge. Someone really determined could fake
  # this header, but until we see that behavior, we'll allow it so the facet UI works.
  # Also exempt any IPs contained in the CIDR blocks in SAFELIST.
  config.skip_when = ->(config) {
    (is_a?(CatalogController) &&
     params[:action].in?(%w[facet index]) &&
     request.format.json? &&
     request.headers['sec-fetch-dest'] == 'empty') ||
     request.user_agent&.match?('HathiTrust-CRMS') || # for HathiTrust access to copyright exhibit
     request.user_agent&.match?('Siteimprove') || # for Siteimprove crawling
     SAFELIST.map { |cidr| IPAddr.new(cidr) }.any? { |range| request.remote_ip.in?(range) }
  }

  # More configuration is available; see:
  # https://github.com/samvera-labs/bot_challenge_page/blob/main/app/models/bot_challenge_page/config.rb
end
# rubocop:enable Layout/LineLength
