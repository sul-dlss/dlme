# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TransformsController do
  let(:exhibit) { create(:exhibit) }
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }

  before do
    sign_in curator
  end

  describe 'GET show' do
    it 'is successful' do
      get :show
      expect(response).to be_successful
    end
  end

  describe 'POST create' do
    before do
      allow(TransformNotification).to receive(:publish)
    end

    it 'redirects to the list page' do
      post :create
      expect(TransformNotification).to have_received(:publish)
      expect(flash[:notice]).to be_present
      expect(response).to be_redirect
    end
  end
end
