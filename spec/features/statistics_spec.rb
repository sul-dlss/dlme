# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Statistics page' do
  let(:stub_response) do
    {
      'response' => { 'numFound' => 100_000 },
      'facet_counts' => {
        'facet_fields' => {
          'agg_data_provider_collection_id_ssim' => ['Value 1', '500', 'Value 2', '300']
        },
        'facet_pivot' => {
          'agg_data_provider.en_ssim,agg_data_provider_country.en_ssim,agg_data_provider_collection_id_ssim' => [
            { 'value' => 'Institution 1', 'count' => '500', 'pivot' => [
              { 'value' => 'Country 1', 'count' => '500' }
            ] },
            { 'value' => 'Institution 2', 'count' => '300', 'pivot' => [
              { 'value' => 'Country 2', 'count' => '200' },
              { 'value' => 'Country 3', 'count' => '100' }
            ] }
          ],
          'agg_provider.en_ssim,agg_provider_country.en_ssim,agg_data_provider_collection_id_ssim' => [
            { 'value' => 'Institution 1', 'count' => '500', 'pivot' => [
              { 'value' => 'Country 1', 'count' => '500' }
            ] },
            { 'value' => 'Institution 2', 'count' => '300', 'pivot' => [
              { 'value' => 'Country 2', 'count' => '300' }
            ] },
            { 'value' => 'Institution 3', 'count' => '300', 'pivot' => [
              { 'value' => 'Country 2', 'count' => '300' }
            ] }
          ]
        }
      }
    }
  end
  let(:stub_dashboard) do
    StatisticsDashboard.new(search_service: instance_double(
      Blacklight::SearchService,
      repository: instance_double(Blacklight::Solr::Repository, search: stub_response),
      search_builder: {}
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

  # just to make sure we didn't break normal searches
  it 'has the usual search box in the navbar' do
    expect(page).to have_css('#search_field')
    select('Title', from: 'Search in')
    fill_in 'q', with: 'Book'
    click_button 'Search'

    expect(page).to have_content 'Search Results'
  end

  it 'has a page available to users via a menu item in the exhibit navbar' do
    expect(page).to have_css('.exhibit-navbar li.nav-item.active', text: 'Statistics')
    expect(page).to have_css('h1', text: 'Statistics')
  end

  it 'has a collections jumbotron section' do
    expect(page).to have_css('.jumbotron h2', text: '2 collections')
    expect(page).to have_css('.jumbotron p', text: '2 holding institutions')
  end

  it 'has an items section' do
    expect(page).to have_css('.jumbotron h2', text: '100,000 items')
    expect(page).to have_css('h2', text: 'Items · 100,000')
  end

  it 'has a Holding Institutions section' do
    expect(page).to have_css('.jumbotron h2', text: '2 holding institutions')
    expect(page).to have_css('.jumbotron p', text: '3 countries')
    expect(page).to have_css('h2', text: 'Holding Institutions · 2')
  end

  it 'has a Data Providers section' do
    expect(page).to have_css('.jumbotron h2', text: '3 data providers')
    expect(page).to have_css('.jumbotron p', text: '2 countries')
    expect(page).to have_css('h2', text: 'Data Providers · 3')
  end
end
