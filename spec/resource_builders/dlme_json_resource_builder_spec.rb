# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DlmeJsonResourceBuilder do
  let(:doc_builder) { described_class.new(resource) }
  let(:resource) { DlmeJson.new(data: { json: json }) }
  let(:fixture_file_path) { File.join(fixture_path, 'json/iiif-single-image.json') }
  let(:json) { File.open(fixture_file_path).read }

  describe 'to_solr' do
    subject(:solr_doc) { doc_builder.to_solr }

    let(:expected) do
      { '__source_ssim' => 'https://github.com/waynegraham/dlme-metadata/blob/master/princeton/mods/eg1_0095.mods',
        'agg_data_provider_ssim' => 'Princeton University. Firestone Library.',
        'agg_edm_rights_ssim' => 'http://www.princeton.edu/~rbsc/research/rights.html',
        'agg_provider_ssim' => 'Princeton University',
        'cho_contributor_ssim' => ['فاتن حمامة', 'محمود ياسين', 'فريد شوقي', 'بركات'],
        'cho_coverage_ssim' => ['Egypt'],
        'cho_date_ssim' => '1977',
        'cho_edm_type_ssim' => 'Image',
        'cho_extent_ssim' => '1 piece',
        'cho_has_type_ssim' => 'Posters',
        'cho_identifier_ssim' => 'eg1-0095',
        'cho_is_part_of_ssim' => 'http://pudl.princeton.edu/collections/pudl0100',
        'cho_language_ssim' => 'Arabic',
        'cho_spatial_ssim' => ['Egypt'],
        'cho_title_ssim' => 'افواه و ارانب',
        'cho_type_ssim' => 'Posters',
        'id' => 'princeton_rj4305881',
        'agg_is_shown_at.wr_id_ssim' => 'http://arks.princeton.edu/ark:/88435/rj4305881',
        'agg_preview.wr_id_ssim' => 'http://libimages.princeton.edu/loris2/pudl0100%2Fposters%2Feg1_0095%2F00000001.jp2/full/200,/0/default.jpg',
        'agg_is_shown_by.wr_id_ssim' => 'https://libimages.princeton.edu/loris2/pudl0100%2Fposters%2Feg1_0095%2F00000001.jp2/full/634,/0/default.jpg',
        'agg_is_shown_by.wr_format_ssim' => 'image/jpeg' }
    end

    it 'adds my custom data' do
      expect(solr_doc).to include(expected)
    end

    it 'serializes service information as json blobs' do
      expect(solr_doc['agg_is_shown_by.wr_has_service_ssim']).to be_an Array
      expect(solr_doc['agg_is_shown_by.wr_has_service_ssim'].first).to eq({
        service_id: 'https://libimages.princeton.edu/loris%2Fpudl0100%2Fposters%2Feg1_0095%2F00000001.jp2',
        service_conforms_to: 'http://iiif.io/api/image',
        service_implements: 'http://iiif.io/api/image/2/level2.json'
      }.to_json)
    end
  end
end
