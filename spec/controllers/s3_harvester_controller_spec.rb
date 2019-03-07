# frozen_string_literal: true

require 'rails_helper'

RSpec.describe S3HarvesterController do
  let(:exhibit) { create(:exhibit) }
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }
  let(:url) { 'http://s3/mybucket/myfile.json' }

  before do
    sign_in curator
  end

  describe 'POST create' do
    before do
      allow(FetchResourcesJob).to receive(:perform_later)
    end

    it 'submits a job' do
      post :create, params: { exhibit_id: exhibit.slug, url: url }
      expect(FetchResourcesJob).to have_received(:perform_later).with(url, exhibit)
      expect(flash[:notice]).to be_present
      expect(response).to be_redirect
    end
  end
end
