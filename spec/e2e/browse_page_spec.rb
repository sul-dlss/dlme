# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'browse page', type: :feature, js: true do
  let(:browse_groups) do
    ['All', 'Recently Added', 'Manuscripts', 'Art & Architecture', 'Serials', 'Photography']
  end

  before do
    visit '/library/browse/'
  end

  it 'has the correct category groups' do
    browse_groups.each do |group|
      expect(page).to have_link(group)
    end
  end

  describe 'browse categories' do
    it 'have result counts that match the count on the category page' do
      # find all the browse category tiles
      categories = page.all('.category')

      # visit each category page and check that the count there matches the
      # count shown on the tile
      categories.each do |category|
        category_count = category.find('.item-count').text.to_i
        visit(category.find('a').href)
        expect(page).to have_css('.item-count', text: category_count)
      end
    end
  end
end
