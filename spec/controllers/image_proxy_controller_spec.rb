# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ImageProxyController do
  describe 'GET access' do
    let(:image_response) { instance_double('HTTP::Response', body: '', content_type: 'image/jpeg') }

    it 'proxies an image request' do
      allow(controller).to receive(:valid_authenticity_token?).and_return true
      # rubocop:disable RSpec/MessageSpies
      expect(HTTP).to receive(:get).with('http://example.com/image1.jpg').and_return(image_response)
      # rubocop:enable RSpec/MessageSpies
      get :access, params: { url: 'http://example.com/image1.jpg', token: 'valid' }
      expect(response).to have_http_status(:ok)
    end

    it 'without a valid token is forbidden' do
      allow(controller).to receive(:valid_authenticity_token?).and_return false
      get :access, params: { url: 'http://example.com/image1.jpg', token: 'invalid' }
      expect(response).to have_http_status(:forbidden)
    end
  end
end
