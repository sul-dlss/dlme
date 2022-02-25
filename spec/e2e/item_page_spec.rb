# frozen_string_literal: true

require 'spec_helper'

RSpec.describe 'item page', type: :feature, js: true do
  describe 'metadata' do
    before do
      visit '/library/catalog/harvard_scw-3288'
    end

    it 'shows the main title in the page title' do
      expect(page).to have_css('h1 .metadata-value',
                               text: 'Main Title: Tarjama-i Sirr al-maktum (a Mughal talismanic manuscript, Raza Library Rampur)')
    end

    it 'shows the image title in the page title' do
      expect(page).to have_css('h1 .metadata-value',
                               text: 'Image Title: Detail view; f.6a Talismans associated with Saratan (Cancer): A man opening the Quran 20329867')
    end

    it 'shows the dates' do
      expect(page).to have_css('.blacklight-date .metadata-value', text: '1580')
    end

    it 'shows the descriptions' do
      expect(page).to have_css('.blacklight-description .metadata-value',
                               text: 'Note: Inscription: Seal of Asaf al-Daula, Nawab of Awadh, 1776/77')
    end

    it 'shows the item contributor' do
      expect(page).to have_css('.blacklight-holding_institution .metadata-value', text: 'Fine Arts Library, Harvard University')
    end

    it 'shows the data contributor' do
      expect(page).to have_css('.blacklight-source_institution .metadata-value', text: 'Harvard University Library')
    end

    it 'shows the extent' do
      expect(page).to have_css('.blacklight-extent .metadata-value', text: 'height 45.5 centimeters; width 30 centimeters')
    end

    it 'shows the subjects' do
      expect(page).to have_css('.blacklight-subject .metadata-value', text: 'illumination (image-making process)')
    end

    it 'shows the alternative titles' do
      expect(page).to have_css('.blacklight-alternative .metadata-value', text: 'al-sirr al-maktum fi mukhatabat al-nujum')
    end

    it 'shows the rights' do
      expect(page).to have_css('.blacklight-dc_rights .metadata-value',
                               text: '(CC BY-NC-SA) Attribution: Harvard Fine Arts Library, Special Collections SCW2016.07911')
    end

    it 'shows the identifier' do
      expect(page).to have_css('.blacklight-identifier .metadata-value', text: '8001347307_URN-3:FHCL:32603475')
    end

    it 'shows the collection the item is part of' do
      expect(page).to have_css('.blacklight-is_part_of .metadata-value',
                               text: 'Stuart Cary Welch Islamic and South Asian Photographic Collection')
    end
  end

  context 'with a IIIF image' do
    it 'shows the mirador viewer' do
      expect(page).to have_css('.mirador-viewer')
    end
  end

  context 'without a IIIF image' do
    it 'does not show the viewer' do
      expect(page).not_to have_css('.mirador-viewer')
    end
  end
end
