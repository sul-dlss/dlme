# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'git version info', type: :feature do
  it 'is available via a status check' do
    visit '/status/version'
    expect(page).to have_content("Version: #{ENV['GIT_INFO']}")
  end
end
 