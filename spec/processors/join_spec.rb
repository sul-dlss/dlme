# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ::Join do
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

    context 'when join_with is not set' do
      it 'joins with <br>' do
        render
        expect(terminator).to have_received(:new).with('a<br>b',
                                                       field_config,
                                                       document,
                                                       context,
                                                       options,
                                                       [])
      end

      context 'and no_html is set' do
        let(:options) { { no_html: true } }

        it 'joins with ;' do
          render
          expect(terminator).to have_received(:new).with('a; b',
                                                         field_config,
                                                         document,
                                                         context,
                                                         options,
                                                         [])
        end
      end
    end

    context 'when join_with is in the config' do
      let(:field_config) { Blacklight::Configuration::NullField.new(join_with: '') }

      it 'joins with the provided joiner' do
        render
        expect(terminator).to have_received(:new).with('ab',
                                                       field_config,
                                                       document,
                                                       context,
                                                       options,
                                                       [])
      end
    end
  end
end
