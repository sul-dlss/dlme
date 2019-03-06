# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TransformNotification do
  describe '.publish' do
    let(:client) { instance_double(Aws::SNS::Client, publish: true) }

    before do
      allow(Settings.sns).to receive(:topic_arn).and_return('test_topic')
      allow(Aws::SNS::Client).to receive(:new).and_return(client)
    end

    context 'when data_dir has a value' do
      let(:data_dir) { 'stanford/maps' }

      it 'sends a message with data_dir' do
        described_class.publish data_dir
        expect(client).to have_received(:publish).with(
          message: '{"data_dir":"stanford/maps"}', topic_arn: 'test_topic'
        )
      end
    end

    context 'when data_dir is nil' do
      let(:data_dir) { nil }

      it 'sends a message with blank data_dir' do
        described_class.publish data_dir
        expect(client).to have_received(:publish).with(
          message: '{"data_dir":null}', topic_arn: 'test_topic'
        )
      end
    end
  end
end
