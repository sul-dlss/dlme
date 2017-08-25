# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ::Paragraph do
  include Capybara::RSpecMatchers
  let(:document) { instance_double(SolrDocument) }
  let(:context) { double }
  let(:options) { double }
  let(:terminator) { class_double Blacklight::Rendering::Terminator, new: term_instance }
  let(:term_instance) { instance_double Blacklight::Rendering::Terminator, render: '' }
  let(:stack) { [terminator] }
  let(:processor) { described_class.new(values, field_config, document, context, options, stack) }

  describe '#render' do
    subject(:render) { processor.render }

    let(:values) { %w[a b] }
    let(:field_config) { Blacklight::Configuration::NullField.new }

    context 'when paragraph is not set' do
      it "doesn't modify values" do
        render
        expect(terminator).to have_received(:new).with(values,
                                                       field_config,
                                                       document,
                                                       context,
                                                       options,
                                                       [])
      end
    end

    context 'when paragraph is in the config' do
      let(:field_config) { Blacklight::Configuration::NullField.new(paragraph: true) }

      it 'makes paragraphs' do
        render
        expect(terminator).to have_received(:new).with(['<p>a</p>', '<p>b</p>'],
                                                       field_config,
                                                       document,
                                                       context,
                                                       options,
                                                       [])
      end
    end
  end
end
