# frozen_string_literal: true

require 'rails_helper'
require 'cancan/matchers'

RSpec.describe Ability do
  subject { ability }

  let(:ability) { described_class.new(user) }

  context 'for a regular user' do
    let(:user) { nil }

    it { is_expected.not_to be_able_to(:manage, :all) }
  end

  context 'for a curator user' do
    let(:user) { create(:exhibit_curator) }

    it { is_expected.to be_able_to(:manage, :all) }
  end
end
