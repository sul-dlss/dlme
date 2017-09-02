# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Transforming MARC records' do
  let(:indexer) { Pipeline.for('penn_marc').indexer(HarvestedResource.new(original_filename: fixture_file_path)) }
  let(:data) { File.open(fixture_file_path) }
  let(:exhibit) { create(:exhibit) }
  let(:slug) { exhibit.slug }

  before do
    indexer.settings['exhibit_slug'] = slug
    allow(CreateResourceJob).to receive(:perform_later)
  end

  describe 'Transform MARC record' do
    let(:fixture_file_path) { File.join(fixture_path, 'marc/penn-Mideastmarc.mrc') }

    it 'does the transform' do
      indexer.process(data)
      expect(CreateResourceJob).to have_received(:perform_later).at_least(:once) do |id, _two, json|
        dlme = JSON.parse(json)
        next unless id == 'penn_5861076'
        expect(dlme['id']).to eq 'penn_5861076'
        expect(dlme['agg_data_provider']).to eq 'University of Pennsylvania Libraries'
        expect(dlme['agg_has_view']).to include('wr_id' => ['http://hdl.library.upenn.edu/1017.12/366278'])
        expect(dlme['agg_provider']).to eq 'University of Pennsylvania Libraries'
        # expect(dlme['cho_contributor']).to eq
        # expect(dlme['cho_coverage']).to eq ['paper']
        expect(dlme['cho_creator']).to eq ['Avicenna, 980-1037']
        expect(dlme['cho_date']).to eq [1100]
        expect(dlme['cho_description'].first).to eq 'Ms. codex.'
        expect(dlme['cho_edm_type']).to eq ['text']
        expect(dlme['cho_extent']).to eq ['92 leaves']
        expect(dlme['cho_format']).to eq ['Book', 'Manuscript/Archive']
        # expect(dlme['cho_has_part']).to eq
        expect(dlme['cho_identifier']).to eq %w[5861076 819418825]
        # expect(dlme['cho_is_part_of']).to eq
        expect(dlme['cho_language']).to eq %w[Arabic Hebrew]
        expect(dlme['cho_medium']).to eq ['paper']
        expect(dlme['cho_subject']).to eq ['Medicine Early works to 1800.', 'Medicine, Arab.', 'Medicine, Medieval.']
        expect(dlme['cho_title']).to eq ['[al-Amrāḍ al-juzʼīyah] [manuscript].']
        expect(dlme['cho_type']).to eq ['text']
      end
    end
  end

  describe 'Transform MARC record with contributor' do
    let(:fixture_file_path) { File.join(fixture_path, 'marc/penn-Mideastmarc.mrc') }

    it 'does the transform' do
      indexer.process(data)
      expect(CreateResourceJob).to have_received(:perform_later).at_least(:once) do |id, _two, json|
        dlme = JSON.parse(json)
        next unless id == 'penn_4805622'
        expect(dlme['id']).to eq 'penn_4805622'
        expect(dlme['agg_data_provider']).to eq 'University of Pennsylvania Libraries'
        expect(dlme['agg_has_view']).to include('wr_id' => ['http://hdl.library.upenn.edu/1017/d/medren/4805622'])
        expect(dlme['agg_provider']).to eq 'University of Pennsylvania Libraries'
        expect(dlme['cho_alternative']).to eq ['Elements. Arabic. Selections.']
        expect(dlme['cho_contributor']).to eq ['Schoenberg, Lawrence J.,former owner.']
        # expect(dlme['cho_coverage']).to eq ['paper']
        expect(dlme['cho_creator']).to eq ['Euclid']
        expect(dlme['cho_date']).to eq [1109]
        expect(dlme['cho_description'].first).to eq 'Ms. gathering.'
        expect(dlme['cho_edm_type']).to eq ['text']
        expect(dlme['cho_extent']).to eq ['8 leaves']
        expect(dlme['cho_format']).to eq ['Book', 'Manuscript/Archive']
        # expect(dlme['cho_has_part']).to eq
        expect(dlme['cho_identifier']).to eq %w[4805622 779347172]
        # expect(dlme['cho_is_part_of']).to eq
        expect(dlme['cho_language']).to eq ['Arabic']
        expect(dlme['cho_medium']).to eq ['paper, ill']
        expect(dlme['cho_subject']).to eq ['Geometry Early works to 1800.', 'Mathematics, Greek.']
        expect(dlme['cho_title']).to eq ['[Gathering from Ikhtiṣār min al-maqālāt min kitāb Uqlīdis] [manuscript].']
        expect(dlme['cho_type']).to eq ['text']
      end
    end
  end
end
