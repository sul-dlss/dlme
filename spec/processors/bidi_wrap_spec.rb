# frozen_string_literal: true

require 'rails_helper'

RSpec.describe BidiWrap do
  include Capybara::RSpecMatchers
  let(:document) { instance_double(SolrDocument) }
  let(:context) { double }
  let(:options) { {} }
  let(:terminator) { class_double Blacklight::Rendering::Terminator, new: term_instance }
  let(:term_instance) { instance_double Blacklight::Rendering::Terminator, render: '' }
  let(:stack) { [terminator] }
  let(:processor) { described_class.new(values, field_config, document, context, options, stack) }

  describe '#render' do
    subject(:render) { processor.render }

    let(:values) { %w[a b] }
    let(:field_config) { Blacklight::Configuration::NullField.new }

    it 'wraps with <bdi>' do
      render
      expected = ['<bdi class="metadata-value">a</bdi>', '<bdi class="metadata-value">b</bdi>']
      expect(terminator).to have_received(:new).with(expected,
                                                     field_config,
                                                     document,
                                                     context,
                                                     options,
                                                     [])
    end

    context 'when no_html is set' do
      let(:options) { { no_html: true } }

      it 'does nothing' do
        render
        expect(terminator).to have_received(:new).with(values,
                                                       field_config,
                                                       document,
                                                       context,
                                                       options,
                                                       [])
      end
    end
  end
end
