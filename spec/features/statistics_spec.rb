# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Statistics page', type: :feature do
  let(:stub_response) do
    {
      'response' => { 'numFound' => 100 },
      'facet_counts' => {
        'facet_pivot' => {
          'agg_provider.en_ssim,agg_provider_country.en_ssim,agg_data_provider_collection_ssim' => [
            { 'value' => 'Institution 1', 'count' => '500', 'pivot' => [
              { 'value' => 'Country 1', 'count' => '500' }
            ] },
            { 'value' => 'Institution 2', 'count' => '300', 'pivot' => [
              { 'value' => 'Country 2', 'count' => '300' }
            ] }
          ]
        }
      }
    }
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

    visit root_path

    within '.exhibit-navbar' do
      click_link 'Statistics'
    end
  end

  it 'has a page available to users via a menu item in the exhibit navbar' do
    expect(page).to have_css('.exhibit-navbar li.nav-item.active', text: 'Statistics')
    expect(page).to have_css('h1', text: 'Statistics')
  end

  it 'has an items section' do
    expect(page).to have_css('.jumbotron h2', text: '100 items')
    expect(page).to have_css('h2', text: 'Items · 100')
  end

  it 'has a Contributors section' do
    expect(page).to have_css('.jumbotron h2', text: '2 contributors')
    expect(page).to have_css('.jumbotron p', text: '2 countries')
    expect(page).to have_css('h2', text: 'Contributors · 2')
  end
end
