# frozen_string_literal: true

module DLME
  # Misc. utilities for working with DLME data
  module Utils
    extend ActiveSupport::Benchmarkable

    def self.caching_faraday_client
      Faraday.new do |builder|
        builder.use :http_cache, store: Rails.cache

        builder.adapter Faraday.default_adapter
      end
    end

    def self.fetch_json(uri)
      resp = benchmark("DLME::Utils.fetch_json(#{uri})", level: :debug) do
        caching_faraday_client.get uri
      end
      ::JSON.parse(resp.body) if resp.success?
    end

    def self.logger
      Rails.logger
    end
  end
end
