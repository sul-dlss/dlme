# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ImageProxyController do
  describe 'GET access' do
    let(:url) { 'http://example.com/image1.jpg' }

    def upstream_response(body: 'image-bytes', content_type: 'image/jpeg', klass: Net::HTTPOK, code: '200')
      klass.new('1.1', code, 'msg').tap do |res|
        res['Content-Type'] = content_type
        allow(res).to receive(:read_body).and_yield(body)
      end
    end

    before do
      Rails.cache.clear
      request.headers['Referer'] = controller.search_catalog_url
    end

    context 'with a valid image response' do
      before do
        response = upstream_response
        allow(SsrfFilter).to receive(:get).and_yield(response).and_return(response)
      end

      it 'proxies the image' do
        get :access, params: { url: url }
        expect(response).to have_http_status(:ok)
        expect(response.body).to eq 'image-bytes'
        expect(response.media_type).to eq 'image/jpeg'
        expect(SsrfFilter).to have_received(:get).with(url, hash_including(:max_redirects, :http_options))
      end
    end

    it 'without a valid referer is forbidden' do
      request.headers['Referer'] = 'http://evil.example.com/'
      get :access, params: { url: url }
      expect(response).to have_http_status(:forbidden)
    end

    it 'rejects loopback addresses' do
      get :access, params: { url: 'http://127.0.0.1/secret' }
      expect(response).to have_http_status(:bad_request)
    end

    it 'rejects private addresses' do
      get :access, params: { url: 'http://10.0.0.1/secret' }
      expect(response).to have_http_status(:bad_request)
    end

    it 'rejects non-http schemes' do
      get :access, params: { url: 'file:///etc/passwd' }
      expect(response).to have_http_status(:bad_request)
    end

    it 'rejects redirects that resolve to a private address' do
      allow(SsrfFilter).to receive(:get).and_raise(SsrfFilter::PrivateIPAddress)
      get :access, params: { url: url }
      expect(response).to have_http_status(:bad_request)
    end

    it 'rejects non-image responses' do
      res = upstream_response(body: 'secret', content_type: 'text/html')
      allow(SsrfFilter).to receive(:get).and_yield(res).and_return(res)
      get :access, params: { url: url }
      expect(response).to have_http_status(:bad_request)
    end

    it 'rejects SVG responses' do
      res = upstream_response(body: '<svg/>', content_type: 'image/svg+xml')
      allow(SsrfFilter).to receive(:get).and_yield(res).and_return(res)
      get :access, params: { url: url }
      expect(response).to have_http_status(:bad_request)
    end

    it 'rejects responses larger than the configured maximum' do
      res = upstream_response(body: 'x' * (Settings.image_proxy.max_size + 1))
      allow(SsrfFilter).to receive(:get).and_yield(res).and_return(res)
      get :access, params: { url: url }
      expect(response).to have_http_status(:bad_request)
    end

    it 'rejects unsuccessful responses' do
      res = upstream_response(klass: Net::HTTPNotFound, code: '404')
      allow(SsrfFilter).to receive(:get).and_yield(res).and_return(res)
      get :access, params: { url: url }
      expect(response).to have_http_status(:bad_request)
    end

    it 'returns bad gateway when the upstream cannot be reached' do
      allow(SsrfFilter).to receive(:get).and_raise(Errno::ECONNREFUSED)
      get :access, params: { url: url }
      expect(response).to have_http_status(:bad_gateway)
    end
  end
end
