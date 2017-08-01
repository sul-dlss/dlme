# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SearchBuilder do
  subject(:search_builder) { described_class.new scope }

  let(:user_params) { {} }
  let(:blacklight_config) { Blacklight::Configuration.new }
  let(:scope) { instance_double ApplicationController, blacklight_config: blacklight_config }

  # describe "my custom step" do
  #   subject(:query_parameters) do
  #     search_builder.with(user_params).processed_parameters
  #   end
  #
  #   it "adds my custom data" do
  #     expect(query_parameters).to include :custom_data
  #   end
  # end
end
