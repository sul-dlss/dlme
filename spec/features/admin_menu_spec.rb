# frozen_string_literal: true

require 'rails_helper'

# This is primarily a stub spec to validate we are executing javascript
# until we have more thorough browser integration tests for other needs
RSpec.describe 'Admin menu', js: true do
  let(:exhibit) { create(:exhibit) }
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }

  before { login_as curator }

  it 'has a customized togglable menu that includes a "Transform data" link' do
    visit root_path

    within '#user-util-collapse' do
      expect(page).not_to have_css('li a', text: 'Transform data', visible: :visible)
      click_link curator.email
      expect(page).to have_css('li a', text: 'Transform data', visible: :visible)
    end
  end
end
