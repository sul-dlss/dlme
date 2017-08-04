SecureHeaders::Configuration.default do |config|
  config.cookies = {
    secure: true,
    httponly: true,
    samesite: {
      lax: true
    }
  }

  # thanks to sir-trevor..
  config.csp[:script_src] << '\'unsafe-eval\''
  
  if Rails.env.development? || Rails.env.test?
    config.cookies[:secure] = false
    config.hsts = SecureHeaders::OPT_OUT
    config.csp[:default_src] << 'http:'
    config.csp[:script_src] << 'http:'
  end
end
