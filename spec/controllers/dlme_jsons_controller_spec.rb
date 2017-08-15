# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DlmeJsonsController do
  let(:exhibit) { create(:exhibit) }
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }
  let(:json) { '{"key":"value"}' }

  before do
    sign_in curator
  end

  describe 'GET index' do
    it 'is successful' do
      get :index, params: { exhibit_id: exhibit.slug }
      expect(response).to be_success
    end
  end

  describe 'GET show' do
    let(:dlme_json) { create(:dlme_json) }

    it 'is successful' do
      get :show, params: { exhibit_id: exhibit.slug, id: dlme_json }
      expect(response).to be_success
    end
  end

  describe 'DELETE destroy' do
    let!(:dlme_json) { create(:dlme_json) }

    it 'is successful' do
      expect { delete :destroy, params: { exhibit_id: exhibit.slug, id: dlme_json } }
        .to change { DlmeJson.count }.by(-1)
      expect(response).to be_redirect
    end
  end
end
