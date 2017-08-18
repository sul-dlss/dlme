# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CreateResourceJob, type: :job do
  let(:id) { 'foo' }
  let(:exhibit) { create(:exhibit) }
  let(:json) { attributes_for(:dlme_json).dig(:data, :json) }

  it 'imports files' do
    expect { described_class.perform_now(id, exhibit, json) }
      .to change { DlmeJson.count }.by(1)
  end
end
