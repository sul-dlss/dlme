# frozen_string_literal: true

require 'spec_helper'

# link to metdata description file on google docs

describe 'Metadata Fields' do
  it 'has the correct metadata strings' do
    visit '/catalog/81055%2Fvdc_100000000831.0x000044_dlme'
    # $stderr.puts(page.find('dt.blacklight-dc_rights').text)

    expect(page).to have_selector('dt.blacklight-dc_rights', text: 'Rights:')
  end
end
