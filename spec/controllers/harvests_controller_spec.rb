# frozen_string_literal: true

require 'rails_helper'

RSpec.describe HarvestsController do
  let(:admin) { create(:site_admin) }

  before do
    sign_in admin
  end

  describe 'GET index' do
    it 'is successful' do
      get :index
      expect(response).to be_success
    end
  end

  describe 'POST create' do
    before do
      allow(ImportJob).to receive(:perform_later)
    end

    it 'is successful' do
      post :create
      expect(response).to redirect_to harvests_path
      expect(ImportJob).to have_received(:perform_later).with(Harvest)
    end
  end

  describe 'POST transform' do
    let(:harvest) { Harvest.create! }

    before do
      allow(ReprocessJob).to receive(:perform_later)
    end

    it 'is successful' do
      post :transform, params: { id: harvest }
      expect(response).to redirect_to harvests_path
      expect(ReprocessJob).to have_received(:perform_later).with(Harvest)
    end
  end
end
