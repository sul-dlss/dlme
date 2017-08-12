# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Transforming FGDC files' do
  describe 'Transform Harvard FGDC file' do
    let(:indexer) do
      Traject::Indexer.new('exhibit_slug' => slug, 'source' => 'harvard_fgdc').tap do |i|
        i.load_config_file('config/traject.rb')
        i.load_config_file('lib/traject/fgdc_config.rb')
      end
    end
    let(:fixture_file_path) { File.join(fixture_path, 'fgdc/HARVARD.SDE2.AFRICOVER_EG_RIVERS.fgdc.xml') }
    let(:data) { File.open(fixture_file_path).read }
    let(:exhibit) { create(:exhibit) }
    let(:slug) { exhibit.slug }

    before do
      allow(CreateResourceJob).to receive(:perform_later)
    end

    it 'does the transform' do
      indexer.process(data)
      expect(CreateResourceJob).to have_received(:perform_later) do |_id, _two, json|
        dlme = JSON.parse(json)
        expect(dlme['id']).to eq 'AFRICOVER_EG_RIVERS'
        expect(dlme['agg_data_provider']).to eq 'Harvard University. Center for Geographic Analysis'
        expect(dlme['agg_provider']).to eq 'Harvard University Library'
        # rubocop:disable Metrics/LineLength
        expect(dlme['agg_has_view']).to include('wr_id' => ['http://hgl.harvard.edu:8080/HGL/jsp/HGL.jsp?action=VColl&VCollName=AFRICOVER_EG_RIVERS'],
                                                'wr_rights' => ["The data remains full property of the owners. It can be accessed, reproduced and distributed given that the owner information is explicitly acknowledged and displayed in the copyright information (I.E. Produced by FAO - Africover). The\n      Authors do not assume any responsibilities for improper use of the data."])
        # rubocop:enable Metrics/LineLength
        expect(dlme['cho_coverage']).to eq ['2002']
        expect(dlme['cho_date']).to eq ['20020404']
        expect(dlme['cho_dc_rights'].first).to start_with 'The data remains full property of the owners.'
        expect(dlme['cho_description'].first).to start_with 'Egypt rivers from The Multipurpose Africover Database'
        expect(dlme['cho_edm_type']).to eq ['dataset']
        expect(dlme['cho_format']).to eq %w[SHAPE Vector String]
        expect(dlme['cho_has_type']).to eq ['vector digital data']
        expect(dlme['cho_identifier']).to eq ['AFRICOVER_EG_RIVERS']
        expect(dlme['cho_provenance'].first).to eq 'Food and Agriculture Organization of the United Nations'
        expect(dlme['cho_publisher'].first).to eq 'Harvard Map Collection, Harvard College Library'
        expect(dlme['cho_source'].first).to eq 'Food and Agriculture Organization of the United Nations'
        expect(dlme['cho_spatial']).to eq ['Egypt', '33.080360', '31.524937', '22.005644', '29.850088']
        expect(dlme['cho_title']).to eq ['Egypt Rivers', '1st']
        expect(dlme['cho_type']).to eq ['vector digital data']
      end
    end
  end
end
