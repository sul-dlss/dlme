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
      expect(dlme['agg_provider']).to eq 'Yale Univerity Libraries'
      expect(dlme['id']).to eq 'yale_4021741'
      expect(dlme['cho_id']).to eq 'yale_4021741'
      expect(dlme['cho_provenance']).to eq 'Venice'
      expect(dlme['cho_creator']).to eq [
        'AverroeÌˆs, 1126-1198. Colliget',
        'Ibn Zuhr, Ê»Abd al-Malik ibn AbiÌ„ al-Ê»AlaÌ„Ê¼, d. 1162',
        'Jacobus Hebraeus, 13th cent', 'Magister Patavinus, 13th cent'
      ]
      expect(dlme['cho_title']).to eq 'Liber Teisir, sive Rectificatio medicationis et regiminis : antidotarium.'
      expect(dlme['cho_alternative_title']).to eq 'Liber Teisir, sive Rectificatio medicationis et regiminis : antidotarium.'
      expect(dlme['cho_publisher']).to eq 'Joannes and Gregorius de Gregoriis, de Forlivio'
      expect(dlme['edm:dateProvide']).to eq '4 January 1490-1491'
      expect(dlme['cho_description']).to eq '[4], 40, 63, [1] leaves ; 32 cm.'
      expect(dlme['cho_language']).to eq 'Latin'
      expect(dlme['cho_description']).to eq [
        'Includes Averroes: Colliget.',
        'Translated from Arabic into Hebrew by Jacobus Hebraeus; into Latin by Paravicius.',
        'Yale Med copy from Ulrich Ellenbog, who signed, annotated, and decorated the text with some red and blue letters.',
        'Yale Med copy has contemporary German binding, K109 Salve-Meister, Memmingen. Described by Scott Husby, 2010.'
      ]
      expect(dlme['cho_description']).to eq nil
      expect(dlme['cho_provenance']).to eq 'Ellenbog, Ulrich,--ca. 1435-1499.--Ownership'
      expect(dlme['cho_subject']).to eq [
        'Incunabula in Yale Library',
        'Materia medica',
        'Medicine, Arab',
        'Therapeutics--Early works to 1800'
      ]
      expect(dlme['cho_edm_type']).to eq 'text'
      expect(dlme['cho_is_part_of']).to eq 'Cushing/Whitney Medical Library'
      expect(dlme['wr_dc_rights']).to start_with 'The use of this image may be subject to the copyright law of the United States'\
      ' (Title 17, United States Code) or to site license or other rights management terms and conditions. The person using the'\
      ' image is liable for any infringement'
      expect(dlme['cho_provenance']).to eq 'Arcadia Fund, 2013'
      expect(dlme['agg_is_shown_by']).to eq 'http://hdl.handle.net/10079/bibid/4021741'
      expect(dlme['agg_is_shown_at']).to eq 'http://hdl.handle.net/10079/bibid/4021741'
    end
  end
end
