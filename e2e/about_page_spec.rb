# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'about page', type: :feature, js: true do
  before do
    visit '/library/about/about/'
  end

  it 'shows the page title' do
    expect(page).to have_css('h1.page-title', text: 'About')
  end
end
