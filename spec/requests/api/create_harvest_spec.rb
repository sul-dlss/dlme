# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::Harvests', type: :request do
  let!(:exhibit) { create(:exhibit) }
  let(:url) { 'myfile.json' }
  let(:secret) { 'secret' }

  before do
    allow(ENV).to receive(:fetch).with('API_TOKEN', '').and_return(secret)
  end

  describe 'POST create' do
    let(:body) { "{\"id\":\"one\"}\n{\"id\":\"two\"}" }

    before do
      allow(File).to receive(:read).and_return(body)
      allow(File).to receive(:exist?).and_return(true)
      allow(AddResourcesJob).to receive(:perform_later)
    end

    it 'submits a job' do
      post '/api/harvests', params: { url: url }, headers: { Authorization: "Bearer #{secret}", Accept: 'application/json' }
      json = JSON.parse(response.body)

      expect(response.status).to eq(202)
      expect(json['message']).to eq('Harvest successfully initiated')
      expect(AddResourcesJob).to have_received(:perform_later).with("tmp/data/#{url}", exhibit: exhibit, local: true)
    end

    context 'when the token is invalid' do
      it 'returns an error code' do
        post '/api/harvests', params: { url: url }, headers: { Authorization: 'Bearer this_is_wrong', Accept: 'application/json' }

        expect(response.status).to eq(401)
        expect(AddResourcesJob).not_to have_received(:perform_later)
      end
    end

    context 'when there is no supplied file URL' do
      it 'returns an error code' do
        post '/api/harvests', headers: { Authorization: "Bearer #{secret}", Accept: 'application/json' }
        json = JSON.parse(response.body)

        expect(response.status).to eq(400)
        expect(json['error']).to eq('Invalid file URL')
        expect(AddResourcesJob).not_to have_received(:perform_later)
      end
    end

    context 'when the file does not exist' do
      before do
        allow(File).to receive(:read).and_call_original
      end

      it 'returns an error code' do
        post '/api/harvests', params: { url: url }, headers: { Authorization: "Bearer #{secret}", Accept: 'application/json' }
        json = JSON.parse(response.body)

        expect(response.status).to eq(400)
        expect(json['error']).to eq('File not found')
        expect(AddResourcesJob).not_to have_received(:perform_later)
      end
    end

    context 'when content at url contains duplicate identifiers' do
      let(:body) { "{\"id\":\"one\"}\n{\"id\":\"one\"}" }

      it 'returns an error code' do
        post '/api/harvests', params: { url: url }, headers: { Authorization: "Bearer #{secret}", Accept: 'application/json' }
        json = JSON.parse(response.body)

        expect(response.status).to eq(422)
        expect(json['error']).to eq('JSON contained duplicate identifiers')
        expect(AddResourcesJob).not_to have_received(:perform_later)
      end
    end
  end
end
