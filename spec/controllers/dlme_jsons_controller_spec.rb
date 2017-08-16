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

  describe 'GET edit' do
    let(:dlme_json) { create(:dlme_json) }

    it 'is successful' do
      get :edit, params: { exhibit_id: exhibit.slug, id: dlme_json }
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

  describe 'PATCH update' do
    let(:dlme_json) { create(:dlme_json) }

    context 'when save is successful' do
      it 'redirects to the list page' do
        patch :update, params: { exhibit_id: exhibit.slug,
                                 id: dlme_json,
                                 dlme_json: { data: { json: '{"foo":"bar"}' } } }
        expect(dlme_json.reload.data[:json]).to eq '{"foo":"bar"}'
        expect(response).to be_redirect
      end
    end

    context 'when save is successful' do
      before do
        allow(DlmeJson).to receive(:find).and_return(dlme_json)
        allow(dlme_json).to receive(:save_and_index).and_return(false)
      end
      it 'draws the edit page' do
        patch :update, params: { exhibit_id: exhibit.slug,
                                 id: dlme_json,
                                 dlme_json: { data: { json: 'foobar' } } }
        expect(flash[:error]).to eq 'There was a problem saving the JSON'
        expect(response).to render_template('edit')
      end
    end
  end
end
