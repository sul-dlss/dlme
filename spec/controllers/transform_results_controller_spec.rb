# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TransformResultsController do
  let(:exhibit) { create(:exhibit) }
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }

  before do
    sign_in curator
    create_list(:transform_result, 26)
  end

  describe 'GET show' do
    it 'is successful' do
      get :show
      expect(response).to be_successful
    end
  end
end
