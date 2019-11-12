# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Statistics page', type: :feature do
  before { create(:exhibit) }

  it 'has a page available to users via a menu item in the exhibit navbar' do
    visit root_path

    within '.exhibit-navbar' do
      click_link 'Statistics'
    end

    expect(page).to have_css('.exhibit-navbar li.nav-item.active', text: 'Statistics')
    expect(page).to have_css('h1', text: 'Statistics')
  end
end
