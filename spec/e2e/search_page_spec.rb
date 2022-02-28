# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'search page', type: :feature, js: true do
  before do
    visit '/library/catalog/'
  end

  it 'can search in arabic' do
    fill_in('q', with: 'شهرفرنگ')
    click_button(class: 'search-btn')
    expect(page).to have_content('لباس زنان در ایران')
  end

  it 'can search in english' do
    fill_in('q', with: 'Cairo')
    click_button(class: 'search-btn')
    expect(page).to have_content('Cairo University Bridge')
  end

  it 'can search in romanized arabic' do
    fill_in('q', with: 'Muṣawwar')
    click_button(class: 'search-btn')
    expect(page).to have_content('al-Muṣawwar, No. 27, April 17, 1925')
  end
end
