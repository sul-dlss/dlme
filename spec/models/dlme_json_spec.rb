# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DlmeJson do
  let(:instance) do
    described_class.new(data: { json: json },
                        exhibit: exhibit)
  end
  let(:exhibit) { Spotlight::Exhibit.new }
  let(:json) { file_fixture('json/embeddable.json').read }

  describe 'valid?' do
    subject(:valid?) { instance.valid? }

    context 'when the JSON is valid' do
      it 'sets no errors' do
        expect(valid?).to be true
        expect(instance.errors).to be_empty
      end
    end

    context 'with a url' do
      before do
        instance.url = 'http://example.com'
        instance.save
      end

      it 'the url is required to be unique' do
        new_instance = described_class.new(
          data: { json: json },
          exhibit: exhibit,
          url: 'http://example.com'
        )

        expect(new_instance).not_to be_valid
        expect(new_instance.errors[:url].to_a).to eq(['has already been taken'])
      end
    end

    context 'without a URL' do
      before do
        instance.url = nil # being explicit
        instance.save
      end

      it 'the URL is not required to be unique' do
        new_instance = described_class.new(
          data: { json: json },
          exhibit: exhibit,
          url: nil
        )

        expect(new_instance).to be_valid
        expect(new_instance.errors).to be_empty
      end
    end

    context 'when the JSON is not parsable' do
      let(:json) { '{},' }

      it 'sets an error' do
        expect(valid?).to be false
        expect(instance.errors[:json]).to eq ['Invalid JSON']
      end
    end
  end
end
