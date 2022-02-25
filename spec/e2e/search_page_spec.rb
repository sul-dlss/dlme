# frozen_string_literal: true

require 'spec_helper'

RSpec.describe 'search page', type: :feature, js: true do
  before do
    visit '/catalog/'
  end

  it 'can search in arabic' do
    fill_in('q', with: 'بوس')
    click_button(class: 'search-btn')
    expect(page).to have_content('بؤس العلمانية من بؤس العلمانيين')
  end

  it 'can search in english' do
    fill_in('q', with: 'Astronomical charts')
    click_button(class: 'search-btn')
    expect(page).to have_content('Astronomical charts for Fatḥ-ʻAlī Shāh Qājār.')
  end

  it 'can search in romanized arabic' do
    fill_in('q', with: 'Būstān.')
    click_button(class: 'search-btn')
    expect(page).to have_content('Būstān.')
  end
end
