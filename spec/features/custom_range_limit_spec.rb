# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Custom range limit functionality', js: true do
  let(:exhibit) { create(:exhibit) }
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }
  let(:resource) { DlmeJson.new(json: json, metadata: metadata, exhibit: exhibit) }
  let(:fixture_file_path) { File.join(fixture_path, 'json/iiif-single-image.json') }
  let(:json) { File.read(fixture_file_path) }
  let(:metadata) do
    { 'traject_context_command_line.filename' => fixture_file_path,
      'traject_context_source' => 'dlme_json_resource_spec' }
  end

  before do
    perform_enqueued_jobs do
      resource.save_and_index
    end
    login_as curator
  end

  it 'has a customized togglable range limit, defaulting to Gregorian' do
    visit spotlight.search_exhibit_catalog_path(exhibit, q: '*')
    expect(page).to have_no_css '.facet-limit.blacklight-cho_date_range_hijri_isim'
    find('.facet-limit.blacklight-cho_date_range_norm_isim').click
    expect(page).to have_css '[data-date-range-selector-original-field="cho_date_range_norm_isim"]'
    expect(page).to have_css '#selected_range_field_cho_date_range_norm_isim[checked="checked"]'
    find_by_id('selected_range_field_cho_date_range_hijri_isim').click
    # NOTE: the JS change event isn't being fired in this test for some reason
  end

  it 'custom data attributes needed are available' do
    visit spotlight.search_exhibit_catalog_path(exhibit, q: '*')
    expect(page).to have_no_css '.facet-limit.blacklight-cho_date_range_hijri_isim'
    find('.facet-limit.blacklight-cho_date_range_norm_isim').click
    expect(page).to have_css '[data-date-range-selector-paths*="/catalog/facet/cho_date_range_hijri_isim?q=%2A"]'
    expect(page).to have_css '[data-date-range-selector-paths*="/catalog/facet/cho_date_range_norm_isim?q=%2A"]'
  end

  it 'range limit panel attribute is set removing current range field' do
    visit spotlight.search_exhibit_catalog_path(
      exhibit,
      q: '*', range: { cho_date_range_norm_isim: { begin: 0, end: 2020 } }
    )
    expect(page).to have_css '[data-date-range-selector-paths*="/catalog/facet/cho_date_range_hijri_isim?q=%2A"]'
  end

  it 'Hijri is displayed when that range exists' do
    visit spotlight.search_exhibit_catalog_path(
      exhibit,
      q: '*', range: { cho_date_range_hijri_isim: { begin: 1384, end: 1387 } }
    )

    expect(page).to have_no_css '.facet-limit.blacklight-cho_date_range_norm_isim'
    find('.facet-limit.blacklight-cho_date_range_hijri_isim').click

    expect(page).to have_css '#selected_range_field_cho_date_range_hijri_isim[checked="checked"]'
    find_by_id('selected_range_field_cho_date_range_norm_isim').click
    # NOTE: the JS change event isn't being fired in this test for some reason
  end
end
