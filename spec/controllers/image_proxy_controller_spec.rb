# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ImageProxyController do
  describe 'GET access' do
    let(:image_response) { instance_double('HTTP::Response', body: '', content_type: 'image/jpeg') }

    # rubocop:disable RSpec/BeforeAfterAll
    before(:all) do
      Rails.cache.clear
    end
    # rubocop:enable RSpec/BeforeAfterAll

    it 'proxies an image request' do
      allow(controller).to receive(:valid_authenticity_token?).and_return true
      # rubocop:disable RSpec/MessageSpies
      expect(HTTP).to receive(:get).with('http://example.com/image1.jpg').and_return(image_response)
      # rubocop:enable RSpec/MessageSpies
      request.headers['Referer'] = controller.search_catalog_url
      get :access, params: { url: 'http://example.com/image1.jpg' }
      expect(response).to have_http_status(:ok)
    end

    it 'without a valid referer is forbidden' do
      get :access, params: { url: 'http://example.com/image1.jpg' }
      expect(response).to have_http_status(:forbidden)
    end
  end
end
