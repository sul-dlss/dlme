# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Transforming Yale Arabic and Persian Medical Records CSV file' do
  let(:indexer) { Pipeline.for('yale_csv').indexer(HarvestedResource.new(original_filename: fixture_file_path)) }
  let(:fixture_file_path) { File.join(fixture_path, 'csv/yale_medical.csv') }
  let(:data) { File.open(fixture_file_path).read }
  let(:exhibit) { create(:exhibit) }
  let(:slug) { exhibit.slug }

  before do
    indexer.settings['exhibit_slug'] = slug
    allow(CreateResourceJob).to receive(:perform_later)
  end

  it 'does the transform' do
    indexer.process(data)
    expect(CreateResourceJob).to have_received(:perform_later) do |_id, _two, json|
      dlme = JSON.parse(json)
      expect(dlme['agg_provider']).to eq 'Yale University Libraries'
      expect(dlme['id']).to eq 'yale_4021741'
      expect(dlme['cho_identifier']).to eq ['4021741']
      expect(dlme['cho_provenance']).to eq [
        'Venice',
        'Ellenbog, Ulrich,--ca. 1435-1499.--Ownership'
      ]
      expect(dlme['cho_title']).to eq ['Liber Teisir, sive Rectificatio medicationis et regiminis : antidotarium.']
      expect(dlme['cho_alternative']).to eq ['Rectificatio medicationis et regiminis']
      expect(dlme['cho_publisher']).to eq ['Joannes and Gregorius de Gregoriis, de Forlivio']
      expect(dlme['edm:dateProvider']).to eq ['4 January 1490-1491']
      expect(dlme['cho_description']).to include('[4], 40, 63, [1] leaves ; 32 cm.')
      expect(dlme['cho_language']).to eq ['Latin']
      expect(dlme['cho_subject']).to eq [
        'Incunabula in Yale Library',
        'Materia medica',
        'Medicine, Arab',
        'Therapeutics--Early works to 1800'
      ]
      expect(dlme['cho_edm_type']).to eq ['text']
      expect(dlme['cho_is_part_of']).to eq ['Cushing/Whitney Medical Library']
      expect(dlme['wr_dc_rights']).to eq ['The use of this image may be subject to the copyright law of the United States (Title'\
      ' 17, United States Code) or to site license or other rights management terms and conditions. The person using the image'\
      ' is liable for any infringement']
      expect(dlme['agg_is_shown_by']).to include('wr_id' => 'http://hdl.handle.net/10079/digcoll/22466')
      expect(dlme['agg_is_shown_at']).to include('wr_id' => 'http://hdl.handle.net/10079/digcoll/22466')
    end
  end
end
