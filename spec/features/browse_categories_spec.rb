# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Browse Categories', type: :feature do
  let(:exhibit) { create(:exhibit) }
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }

  context 'when logged in as a curator' do
    before do
      login_as curator
    end

    # This test is to make sure we haven't configured the app in a way that breaks this page
    it 'are available in the admin dashboard' do
      visit spotlight.exhibit_searches_path(exhibit)

      expect(page).to have_css('h1', text: 'Curation Browse')
      expect(page).to have_css('h3', text: 'Browse Categories')
    end
  end
end
