# frozen_string_literal: true

require 'spec_helper'

describe 'Landing Page' do
  before :each do
    visit('/')
  end

  it 'can get to the landing page' do
    expect(page).to have_content('Digital Library of the Middle East')
  end

  context 'facets' do
    it 'has 5 facet groups' do
      expect(page).to have_selector('#facet-panel-homepage-collapse h3', count: 5)
    end
  end

  context 'Browse Categories' do
    it 'has 4 major browse categories' do
      expect(page).to have_selector('.browse-group-categories-block h2', count: 5)
      expect(page).to have_content('Recently Added')
      expect(page).to have_content('Manuscripts')
      expect(page).to have_content('Art & Architecture')
      expect(page).to have_content('Photography')
      expect(page).to have_content('Serials')
    end
  end

  context 'category thumbnails' do
    it 'has valid thumbnails' do
      visit('/')
      doc = Nokogiri::HTML(page.html)
      categories = doc.search("//div[contains(@class, 'browse-category')]")
      # get the first image off the page
      url = categories[0]['style'].match(/url\(.+\)+/)
      link = url.to_s.match(/"([^"]*)/).to_s.gsub('"', '')

      URI.open("https://dlmenetwork.org#{link}") do |f|
        expect(f.status).to eq(%w[200 OK])
      end
    end
  end
end

describe 'About Page' do
  it 'Only has one address' do
    visit('/about/exhibits')
    # doc = Nokogiri::HTML(page.html)
    expect(page).to have_selector('.contacts li', count: 1)
  end
end

describe 'Basic Search' do
  before :each do
    visit('/')
  end

  it 'can search in Arabic' do
    fill_in('q', with: 'بوس')
    click_button(class: 'search-btn')
    expect(page).to have_content('بؤس العلمانية من بؤس العلمانيين')
  end

  it 'can seach in English' do
    fill_in('q', with: 'Astronomical charts')
    click_button(class: 'search-btn')
    expect(page).to have_content('Astronomical charts for Fatḥ-ʻAlī Shāh Qājār.')
  end

  it 'can search in romanized Arabic' do
    fill_in('q', with: 'Būstān.')
    click_button(class: 'search-btn')
    expect(page).to have_content('Būstān.')
  end
end
