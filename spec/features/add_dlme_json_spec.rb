# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'adding DLME JSON', type: :feature do
  let(:exhibit) { create(:exhibit) }
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }
  let(:json) { attributes_for(:dlme_json).dig(:data, :json) }

  before do
    login_as curator
    visit spotlight.admin_exhibit_catalog_path(exhibit)
  end

  it 'has form to add DLME JSON' do
    click_link 'Add items'
    expect(page).to have_link('DLME JSON') # tab name

    fill_in 'Json', with: json

    click_button 'Add DLME JSON file'

    expect(Spotlight::Resource.last.data[:json]).to eq json
  end
end
