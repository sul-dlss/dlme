# frozen_string_literal: true

require 'spec_helper'

describe 'Thumbnail images' do
  it 'has thumbnail images' do
    visit('/')
    doc = Nokogiri::HTML(page.html)
    categories = doc.search("//div[contains(@class, 'browse-category')]")

    # check all thumbnail images
    categories.each do |category|
      url = category['style'].match(/url\(.+\)+/)
      link = url.to_s.match(/"([^"]*)/).to_s.gsub('"', '')

      URI.open("https://dlmenetwork.org#{link}") do |f|
        expect(f.status).to eq(%w[200 OK])
      end
    end
  end
end
