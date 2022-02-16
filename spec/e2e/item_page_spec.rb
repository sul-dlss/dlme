# frozen_string_literal: true

require 'spec_helper'

describe 'IIIF Item Page' do
  
  it 'has all the correct metadata fields' do
    visit '/catalog/harvard_scw-3288'

    expect(page).to have_content('Main Title: Tarjama-i Sirr al-maktum (a Mughal talismanic manuscript, Raza Library Rampur)')
    expect(page).to have_content('Image Title: Detail view; f.6a Talismans associated with Saratan (Cancer): A man opening the Quran 20329867')

    expect(page).to have_selector('#m3')

    expect(page).to have_selector('.blacklight-date')
    expect(page).to have_content('1580')
    expect(page).to have_selector('.blacklight-description')
    expect(page).to have_content('Note: Inscription: Seal of Asaf al-Daula, Nawab of Awadh, 1776/77')
    expect(page).to have_selector('.blacklight-holding_institution')
    expect(page).to have_content('Fine Arts Library, Harvard University')
    expect(page).to have_selector('.blacklight-source_institution')
    expect(page).to have_content('Harvard University Library')
    expect(page).to have_selector('.blacklight-extent')
    expect(page).to have_content('height 45.5 centimeters; width 30 centimeters')
    expect(page).to have_selector('.blacklight-subject')
    expect(page).to have_content('illumination (image-making process)')
    expect(page).to have_selector('.blacklight-alternative')
    expect(page).to have_content('al-sirr al-maktum fi mukhatabat al-nujum')
    expect(page).to have_selector('.blacklight-dc_rights')
    expect(page).to have_content('(CC BY-NC-SA) Attribution: Harvard Fine Arts Library, Special Collections SCW2016.07911')
    expect(page).to have_selector('.blacklight-identifier')
    expect(page).to have_content('8001347307_URN-3:FHCL:32603475')
    expect(page).to have_selector('.blacklight-is_part_of')
    expect(page).to have_content('Stuart Cary Welch Islamic and South Asian Photographic Collection')
  end
end

describe 'Non-IIIF Item Page' do
  it 'exists' do
    visit '/catalog/51.72'

    expect(page).to have_content('"Turban" Helmet')
  end
end
