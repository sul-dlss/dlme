# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Image proxy' do
  let(:url) { 'http://example.com/image1.jpg' }
  let(:headers) { { 'Referer' => 'http://www.example.com/' } }
  let(:solr) { Blacklight.default_index.connection }
  let(:indexed_urls) { [url] }

  def upstream_response(body: 'image-bytes', content_type: 'image/jpeg', klass: Net::HTTPOK, code: '200')
    klass.new('1.1', code, 'msg').tap do |res|
      res['Content-Type'] = content_type
      allow(res).to receive(:read_body).and_yield(body)
    end
  end

  def stub_upstream(**)
    res = upstream_response(**)
    allow(SsrfFilter).to receive(:get).and_yield(res).and_return(res)
  end

  before do
    Rails.cache.clear
    solr.add(indexed_urls.map.with_index { |u, i| { id: "image-proxy-#{i}", 'agg_preview.wr_id_ssim' => [u] } })
    solr.commit
  end

  after do
    solr.delete_by_query('id:image-proxy-*')
    solr.commit
  end

  it 'proxies an indexed thumbnail' do
    stub_upstream
    get '/image_proxy', params: { url: url }, headers: headers
    expect(response).to have_http_status(:ok)
    expect(response.body).to eq 'image-bytes'
    expect(response.media_type).to eq 'image/jpeg'
  end

  it 'does not fetch a url that is not an indexed thumbnail' do
    allow(SsrfFilter).to receive(:get)
    get '/image_proxy', params: { url: 'http://example.com/other.jpg' }, headers: headers
    expect(response).to have_http_status(:not_found)
    expect(SsrfFilter).not_to have_received(:get)
  end

  it 'is forbidden without a valid referer' do
    get '/image_proxy', params: { url: url }, headers: { 'Referer' => 'http://evil.example.com/' }
    expect(response).to have_http_status(:forbidden)
  end

  context 'when an indexed thumbnail points at an internal or non-http address' do
    let(:indexed_urls) { ['http://127.0.0.1/secret', 'http://10.0.0.1/secret', 'file:///etc/passwd'] }

    it 'rejects it without connecting' do
      indexed_urls.each do |internal_url|
        get '/image_proxy', params: { url: internal_url }, headers: headers
        expect(response).to have_http_status(:bad_request)
      end
    end
  end

  it 'rejects redirects to a private address' do
    allow(SsrfFilter).to receive(:get).and_raise(SsrfFilter::PrivateIPAddress)
    get '/image_proxy', params: { url: url }, headers: headers
    expect(response).to have_http_status(:bad_request)
  end

  it 'rejects non-image responses' do
    stub_upstream(body: 'secret', content_type: 'text/html')
    get '/image_proxy', params: { url: url }, headers: headers
    expect(response).to have_http_status(:bad_request)
  end

  it 'rejects SVG responses' do
    stub_upstream(body: '<svg/>', content_type: 'image/svg+xml')
    get '/image_proxy', params: { url: url }, headers: headers
    expect(response).to have_http_status(:bad_request)
  end

  it 'rejects responses larger than the configured maximum' do
    stub_upstream(body: 'x' * (Settings.image_proxy.max_size + 1))
    get '/image_proxy', params: { url: url }, headers: headers
    expect(response).to have_http_status(:bad_request)
  end

  it 'rejects unsuccessful responses' do
    stub_upstream(klass: Net::HTTPNotFound, code: '404')
    get '/image_proxy', params: { url: url }, headers: headers
    expect(response).to have_http_status(:bad_request)
  end

  it 'returns bad gateway when the upstream cannot be reached' do
    allow(SsrfFilter).to receive(:get).and_raise(Errno::ECONNREFUSED)
    get '/image_proxy', params: { url: url }, headers: headers
    expect(response).to have_http_status(:bad_gateway)
  end
end
