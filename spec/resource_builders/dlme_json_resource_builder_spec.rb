# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DlmeJsonResourceBuilder do
  let(:doc_builder) { described_class.new(resource) }
  let(:exhibit) { create(:exhibit) }
  let(:resource) { DlmeJson.new(json: json, metadata: metadata, exhibit: exhibit) }
  let(:fixture_file_path) { File.join(fixture_path, 'json/iiif-single-image.json') }
  let(:json) { File.read(fixture_file_path) }
  let(:metadata) do
    { 'traject_context_command_line.filename' => fixture_file_path,
      'traject_context_source' => 'dlme_json_resource_spec' }
  end

  describe 'to_solr' do
    subject(:solr_doc) { doc_builder.to_solr }

    let(:expected_untokenized_fields) do
      { '__source_ssim' => 'https://github.com/waynegraham/dlme-metadata/blob/master/princeton/mods/eg1_0095.mods',
        'agg_data_provider_ssim' => 'Princeton University. Firestone Library.',
        'agg_data_provider_country_ssim' => 'United States of America',
        'agg_edm_rights_ssim' => 'http://www.princeton.edu/~rbsc/research/rights.html',
        'agg_provider_ssim' => 'Princeton University',
        'agg_provider_country_ssim' => 'United States of America',
        'cho_contributor_ssim' => ['فاتن حمامة', 'محمود ياسين', 'فريد شوقي', 'بركات'],
        'cho_coverage_ssim' => ['Egypt'],
        'cho_date_ssim' => '1977',
        'cho_date_range_norm_isim' => [1977, 1978, 1979],
        'cho_date_range_hijri_isim' => [1384, 1385, 1386, 1387],
        'cho_edm_type_ssim' => 'Image',
        'cho_extent_ssim' => '1 piece',
        'cho_has_type_ssim' => 'Posters',
        'cho_identifier_ssim' => 'eg1-0095',
        'cho_is_part_of_ssim' => 'http://pudl.princeton.edu/collections/pudl0100',
        'cho_language_ssim' => 'Arabic',
        'cho_spatial_ssim' => ['Egypt'],
        'cho_title_ssim' => ['افواه و ارانب'],
        'cho_title.ar-Arab_ssim' => ['افواه و ارانب'],
        'cho_type_ssim' => 'Posters',
        :id => 'princeton_rj4305881',
        'agg_is_shown_at.wr_id_ssim' => 'http://arks.princeton.edu/ark:/88435/rj4305881',
        'agg_is_shown_by.wr_id_ssim' => 'https://libimages.princeton.edu/loris2/pudl0100%2Fposters%2Feg1_0095%2F00000001.jp2/full/634,/0/default.jpg',
        'agg_is_shown_by.wr_format_ssim' => 'image/jpeg' }
    end

    let(:expected_tokenized_fields) do
      { 'cho_contributor_tsim' => ['فاتن حمامة', 'محمود ياسين', 'فريد شوقي', 'بركات'],
        'cho_coverage_tsim' => ['Egypt'],
        'cho_spatial_tsim' => ['Egypt'],
        'cho_title_tsim' => ['افواه و ارانب'],
        'cho_title.ar-Arab_tsim' => ['افواه و ارانب'] }
    end

    it 'adds the original source record' do
      expect(solr_doc).to include('__raw_resource_json_ss')
      expect(JSON.parse(solr_doc['__raw_resource_json_ss'])).to eq JSON.parse(json)
    end

    it 'adds untokenized field data' do
      expect(solr_doc).to include(expected_untokenized_fields)
    end

    it 'adds tokenized field data' do
      expect(solr_doc).to include(expected_tokenized_fields)
    end

    it 'serializes service information as json blobs' do
      expect(solr_doc['agg_is_shown_by.wr_has_service_ssim']).to be_an Array
      expect(solr_doc['agg_is_shown_by.wr_has_service_ssim'].first).to eq({
        service_id: 'https://libimages.princeton.edu/loris%2Fpudl0100%2Fposters%2Feg1_0095%2F00000001.jp2',
        service_conforms_to: 'http://iiif.io/api/image',
        service_implements: 'http://iiif.io/api/image/2/level2.json'
      }.to_json)
    end

    it 'adds sortable fields' do
      expect(solr_doc).to include('sortable_cho_title.ar-Arab_ssi' => 'افواه و ارانب')
      expect(solr_doc).to include('sortable_cho_creator_ssi' => 'Jane Q. Doe')
    end

    it 'includes metadata context fields' do
      expect(solr_doc).to include('traject_context_command_line.filename_ssim' => fixture_file_path,
                                  'traject_context_source_ssim' => 'dlme_json_resource_spec')
    end
  end
end
