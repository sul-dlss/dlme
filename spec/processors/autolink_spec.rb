# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ::Autolink do
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

    let(:values) { ['a http://example.com', 'b'] }
    let(:field_config) { Blacklight::Configuration::NullField.new }

    context 'when autolink is not set' do
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

    context 'when autolink is in the config' do
      let(:field_config) { Blacklight::Configuration::NullField.new(autolink: true) }

      context 'for http links' do
        it 'makes links' do
          render
          expect(terminator).to have_received(:new).with(['a <a href="http://example.com">http://example.com</a>', 'b'],
                                                         field_config,
                                                         document,
                                                         context,
                                                         options,
                                                         [])
        end
      end

      context 'for mail_to links' do
        let(:values) { ['a tracie@example.com', 'b'] }

        it 'makes links' do
          render
          expect(terminator).to have_received(:new).with(['a <a href="mailto:tracie@example.com">tracie@example.com</a>', 'b'],
                                                         field_config,
                                                         document,
                                                         context,
                                                         options,
                                                         [])
        end
      end
    end
  end
end
