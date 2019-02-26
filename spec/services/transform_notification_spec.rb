# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TransformNotification do
  describe '.publish' do
    let(:client) { instance_double(Aws::SNS::Client, publish: true) }
    let(:data_dir) { 'stanford/maps' }

    before do
      allow(Settings.sns).to receive(:topic_arn).and_return('test_topic')
      allow(Aws::SNS::Client).to receive(:new).and_return(client)
    end

    it 'sends a message' do
      described_class.publish data_dir
      expect(client).to have_received(:publish).with(
        message: data_dir, topic_arn: 'test_topic'
      )
    end
  end
end
