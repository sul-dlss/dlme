# frozen_string_literal: true

require 'spec_helper'

describe 'Browse Categories' do
  it 'has the correct browse categories' do
    visit('/browse/')
    expect(page).to have_selector('.browse-group-navigation li', count: 6)
    expect(page).to have_content('All')
    expect(page).to have_content('Recently Added')
    expect(page).to have_content('Manuscripts')
    expect(page).to have_content('Art & Architecture')
    expect(page).to have_content('Serials')
    expect(page).to have_content('Photography')
  end

  it 'has the expected number of results' do
    visit('/browse/')

    doc = Nokogiri::HTML(page.html)
    categories = doc.search("//div[contains(@class, 'category')]")

    categories.each do |category|
      # extract item count
      count = category.search('small').text.gsub(/item?(s?)/, '').strip.to_i
      category.search('span[@class="title"]').text

      link = category.search('a').first
      # clean up the link as capybara appends this to the base URI
      visit(link['href'].gsub('/library', ''))

      doc2 = Nokogiri::HTML(page.html)
      page_count = doc2.search('small').text.gsub(/item?(s?)/, '').strip.to_i
      expect(page_count).to eq(count)
      # $stderr.puts "Checking #{label} (#{link['href']}): #{count} | #{page_count}"
    end
  end
end
