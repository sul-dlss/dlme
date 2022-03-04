Rack::Attack.throttle("logins/ip", limit: 20, period: 1.hour) do |req|
  req.ip if req.post? && req.path.start_with?("/users/sign_in")
end

Rack::Attack.throttle("searches/ip", limit: 15, period: 15.minutes) do |req|
  # don't throttle requests with a q, because it's more likely to be a real user
  next if req.params['q'].present?

  # only throttle search queries
  next unless req.post? && req.path.ends_with?("/catalog")

  # don't throttle the first couple pages of a search result
  next if req.params['page'].present? && req.params['page'].to_i < 10

  req.ip
end
