# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Spotlight Frontend', :js do
  let(:exhibit) { create(:exhibit) }
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }

  describe 'block editor' do
    before do
      login_as curator
      visit spotlight.exhibit_dashboard_path(exhibit)
      click_link 'Feature pages'
      within('.home_page') do
        click_link 'Edit'
      end
    end

    it 'renders the block editor' do
      expect(page).to have_css('.st-blocks')
    end

    it 'renders the block editor icons' do
      within('.st-block-replacer') do
        href_value = find('use')['xlink:href']
        expect(href_value).to match(/.+\.svg#add-block$/)
      end
    end
  end
end
