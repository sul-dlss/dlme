# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'statistics/_contributors.html.erb', type: :view do
  before do
    render partial: 'statistics/contributors', locals: {
      contributors: contributors
    }
  end

  let(:stub_response) do
    { 'facet_counts' => {
      'facet_pivot' => {
        'agg_provider.en_ssim,agg_provider_country.en_ssim,agg_data_provider_collection_id_ssim' => [
          { 'value' => 'Institution 1', 'count' => '5000', 'pivot' => [
            { 'value' => 'Country 1', 'count' => '500', 'pivot' => %w[Does Not Matter] }
          ] },
          { 'value' => 'Institution 2', 'count' => '300', 'pivot' => [
            { 'value' => 'Country 2', 'count' => '200', 'pivot' => ['thing'] },
            { 'value' => 'Country 3', 'count' => '100', 'pivot' => ['thing'] }
          ] }
        ]
      }
    } }
  end

  let(:contributors) do
    StatisticsDashboard::Contributors.new(stub_response, provider_field: 'agg_provider')
  end

  it 'has the total number of data providers in the heading' do
    expect(rendered).to have_css('h2', text: 'Data Providers · 2')
  end

  it 'has a table with each institution, the country, and number of items' do
    expect(rendered).to have_css('table tbody tr:nth-child(1) td', text: 'Institution 1')
    expect(rendered).to have_css('table tbody tr:nth-child(1) td', text: 'Country 1')
    expect(rendered).to have_css('table tbody tr:nth-child(1) td', text: '5,000')

    expect(rendered).to have_css('table tbody tr:nth-child(2) td', text: 'Institution 2')
    expect(rendered).to have_css('table tbody tr:nth-child(2) td', text: 'Country 2')
    expect(rendered).to have_css('table tbody tr:nth-child(2) td', text: '300')
  end

  it 'comma separates multiple countries' do
    expect(rendered).to have_css('table tbody tr:nth-child(2) td', text: 'Country 2, Country 3')
  end

  it 'includes the collection count' do
    expect(rendered).to have_css('table tbody tr:nth-child(1) td', text: '3')
    expect(rendered).to have_css('table tbody tr:nth-child(2) td', text: '1')
  end

  it 'links to the institution' do
    expect(rendered).to have_link('Institution 1', href: /\?f%5Bagg_provider_en%5D%5B%5D=Institution\+1&?/)
    expect(rendered).to have_link('Institution 2', href: /\?f%5Bagg_provider_en%5D%5B%5D=Institution\+2&?/)
  end
end
