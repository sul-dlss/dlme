# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ResourceContent, type: :model do
  describe '#persist' do
    context 'for a new resource' do
      it 'stores the content' do
        expect { described_class.persist('foo') { 'bar' } }
          .to change { described_class.count }.by(1)
      end
    end

    context 'for an existing resource' do
      # rubocop:disable RSpec/VerifiedDoubles
      let(:spy) { double(call: 'baz') }

      # rubocop:enable RSpec/VerifiedDoubles

      before do
        described_class.persist('foo') { 'bar' }
      end

      it "doesn't write the content if the multihash exists" do
        described_class.persist('foo') { spy.call }
        expect(spy).not_to have_received(:call)
      end
    end
  end
end
