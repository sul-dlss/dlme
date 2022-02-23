# frozen_string_literal: true

require 'spec_helper'

RSpec.describe 'about page', type: :feature do
  before do
    visit '/about/'
  end

  it 'shows the page title' do
    expect(page).to have_css('h1.page-title', text: 'About')
  end
end
