Rack::Attack.throttle("logins/ip", limit: 20, period: 1.hour) do |req|
  req.ip if req.post? && req.path.start_with?("/users/sign_in")
end

# throttle bot-like search queries if configured
if Settings.throttle_searches
  Rack::Attack.throttle("searches/ip", limit: 30, period: 5.minutes) do |req|
    # don't throttle requests with a q, because it's more likely to be a real user
    next if req.params['q'].present?

    # only throttle search queries
    next unless req.path.ends_with?("/catalog")

    # don't throttle the first couple pages of a search result
    next if req.params['page'].present? && req.params['page'].to_i < 10

    req.ip
  end

  Rack::Attack.throttled_response_retry_after_header = true

  Rack::Attack.throttled_responder = lambda do |request|
    match_data = request.env['rack.attack.match_data']
    now = match_data[:epoch_time]

    headers = {
      'RateLimit-Limit' => match_data[:limit].to_s,
      'RateLimit-Remaining' => '0',
      'RateLimit-Reset' => (now + (match_data[:period] - now % match_data[:period])).to_s
    }

    [ 429, headers, ["Throttled\n"]]
  end
end

# always allow Stanford traffic
Rack::Attack.safelist_ip('171.64.0.0/14')
Rack::Attack.safelist_ip('10.0.0.0/8')
Rack::Attack.safelist_ip('172.16.0.0/12')
Rack::Attack.safelist_ip('192.168.0.0/16')
