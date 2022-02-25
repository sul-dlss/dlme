# frozen_string_literal: true

require 'spec_helper'

RSpec.describe 'home page', type: :feature, js: true do
  let(:facets) do
    ['Type', 'Language', 'Date range', 'Item contributor', 'Data contributor', 'Time period', 'Geographic region']
  end

  before do
    visit '/'
  end

  it 'has a banner with a link' do
    expect(page).to have_css('a.navbar-brand', text: 'Digital Library of the Middle East')
  end

  describe 'facets' do
    it 'are visible' do
      facets.each do |facet|
        expect(page).to have_css('button.collapse-toggle', text: facet)
      end
    end
  end

  describe 'browse categories' do
    it 'have thumbnail images' do
      page.all('.browse-category').each do |category|
        image_iiif_url = category['style'].match(%r{url\("/(.+)"\)})

        URI.open("https://dlmenetwork.org#{image_iiif_url}") do |f|
          expect(f.status).to eq(%w[200 OK])
        end
      end
    end
  end
end
