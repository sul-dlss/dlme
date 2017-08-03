# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SourceFile, type: :model do
  it 'has a format' do
    expect(build(:source_file).format).to eq 'mods'
  end
end
