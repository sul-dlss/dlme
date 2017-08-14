# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Transforming MODS files' do
  let(:indexer) do
    Traject::Indexer.new('identifier' => identifier, 'exhibit_slug' => slug).tap do |i|
      i.load_config_file('lib/traject/mods_config.rb')
    end
  end
  let(:identifier) { 'stanford_tk780vf9050' }
  let(:fixture_file_path) { File.join(fixture_path, 'mods/stanford.mods') }
  let(:mods) { File.open(fixture_file_path).read }
  let(:exhibit) { create(:exhibit) }
  let(:slug) { exhibit.slug }

  it 'does the transform' do
    expect { indexer.process(mods) }.to change { DlmeJson.count }.by(1)
    dlme = DlmeJson.last.json
    expect(dlme['id']).to eq ['stanford_tk780vf9050']
    expect(dlme['agg_data_provider']).to eq ['Stanford University Library']
    expect(dlme['agg_is_shown_at'].first['wr_id']).to eq ['https://purl.stanford.edu/tk780vf9050']
    expect(dlme['agg_provider']).to eq ['Stanford University Library']
    expect(dlme['cho_alternative']).to eq ['al-Shifāʾ fī taʿrīf ḥuqūq al-Muṣṭafá', 'الشفاء في تعريف حقوق المصطفى']
    expect(dlme['cho_format']).to eq ['paper', 'Laid paper']
    expect(dlme['cho_title']).to eq ['Walters Ms. W.586, Work on the duties of Muslims toward the ' \
                                     'Prophet Muhammad with an account of his life']
    expect(dlme['cho_description'].first).to start_with 'This manuscript is an illuminated copy'
    expect(dlme['cho_date']).to eq ['1777']
    expect(dlme['cho_dc_rights'].first).to start_with 'Licensed for use'
    expect(dlme['cho_edm_type']).to eq ['MIXED MATERIALS']
    expect(dlme['cho_type']).to eq ['mixed material']
    expect(dlme['cho_creator']).to eq ['Abū al-Faḍl ʿIyāḍ ibn Mūsá al-Yaḥṣubī al-Bāhilī',
                                       'ʿIyāḍ al-Yaḥṣubī (d. 544 AH / 1149 CE)',
                                       'ابو الفضل عياض بن موسى اليحصبي الباهلي']
    expect(dlme['cho_contributor']).to eq ['Salīm al-Rashīd']
    expect(dlme['cho_language']).to eq ['ar']
    expect(dlme['cho_is_part_of']).to eq ['Walters Manuscripts']
    expect(dlme['cho_has_part']).to eq ['al-Shifāʾ fī taʿrīf ḥuqūq al-Muṣṭafá', 'الشفاء في تعريف حقوق المصطفى']

    expect(dlme['agg_is_shown_by'].first).to include({
      'wr_id' => ['???'],
      'wr_has_service' => ['???'],
      'wr_is_referenced_by' => ['https://purl.stanford.edu/tk780vf9050/iiif/manifest'],
      'wr_description' => ['reformatted digital', 'access'],
      'wr_format' => ['image/jpeg', 'image/tiff']
    })

    expect(dlme['agg_preview'].first).to include({
        'wr_id' => ['???']
    })
  end
end
