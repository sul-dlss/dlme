# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Robots.txt' do
  context 'when allow_robots is false (default)' do
    it 'prevents robots' do
      get '/robots.txt'
      expect(response).to have_http_status(:ok)
      expect(response.body.split("\n")).to include 'User-agent: *', 'Crawl-delay: 3', 'Disallow: /'
    end
  end

  context 'when allow_robots is true' do
    before do
      allow(Settings).to receive(:allow_robots).and_return(true)
    end

    it 'allows robots' do
      get '/robots.txt'
      expect(response).to have_http_status(:ok)
      expect(response.body.split("\n")).not_to include 'Disallow: /'
    end
  end
end
