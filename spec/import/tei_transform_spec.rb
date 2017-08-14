# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Transforming TEI files' do
  let(:indexer) do
    Traject::Indexer.new('identifier' => identifier, 'exhibit_slug' => slug).tap do |i|
      i.load_config_file('lib/traject/tei_config.rb')
    end
  end
  let(:identifier) { 'penn_ljs394' }
  let(:fixture_file_path) { File.join(fixture_path, 'tei/penn_ljs394.xml') }
  let(:mods) { File.open(fixture_file_path).read }
  let(:exhibit) { create(:exhibit) }
  let(:slug) { exhibit.slug }

  it 'does the transform' do
    expect { indexer.process(mods) }.to change { DlmeJson.count }.by(1)
    dlme = DlmeJson.last.json
    expect(dlme['id']).to eq 'penn_ljs394'
    expect(dlme['cho_title']).to eq 'Section of Tāj al-lughah wa-ṣiḥāḥ al-ʻArabīyah'
    # expect(dlme['cho_alternative']).to eq ['???']
    expect(dlme['cho_description']).to start_with 'Volume from a 14th-century copy'
    expect(dlme['cho_date']).to eq '13--'
    expect(dlme['cho_dc_rights'].first).to start_with 'This description is'
    expect(dlme['cho_dc_rights'].second).to match(/^All\s+referenced images/)

    expect(dlme['cho_creator']).to eq 'Jawharī, Ismāʻīl ibn Ḥammād, d. 1003?'
    # expect(dlme['cho_contributor']).to eq ['???']

    # TODO: where is cho_edm_type found?
  end
end
