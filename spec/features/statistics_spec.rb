# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Statistics page', type: :feature do
  let(:stub_response) do
    { 'response' => { 'numFound' => 100 } }
  end
  let(:stub_dashboard) do
    StatisticsDashboard.new(search_service: instance_double(
      'SearchService',
      search_results: [stub_response]
    ))
  end

  before do
    create(:exhibit)
    allow(StatisticsDashboard).to receive(:new).and_return(stub_dashboard)
  end

  it 'has a page available to users via a menu item in the exhibit navbar' do
    visit root_path

    within '.exhibit-navbar' do
      click_link 'Statistics'
    end

    expect(page).to have_css('.exhibit-navbar li.nav-item.active', text: 'Statistics')
    expect(page).to have_css('h1', text: 'Statistics')
  end

  it 'has an items section' do
    visit root_path

    within '.exhibit-navbar' do
      click_link 'Statistics'
    end

    expect(page).to have_css('h2', text: 'Items · 100')
  end
end
