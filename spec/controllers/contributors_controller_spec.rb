# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ContributorsController do
  let(:exhibit) { create(:exhibit) }

  describe 'GET index' do
    it 'assigns @statistics_dashboard' do
      get :index, params: { exhibit_id: exhibit.slug }

      dashboard = assigns(:statistics_dashboard)
      expect(dashboard).to be_a_kind_of StatisticsDashboard

      # and we remove any injected query parameter data
      query = dashboard.send(:search_builder).to_h
      expect(query.keys).not_to include(/^f\..*\.sort$/)
      expect(query.keys).not_to include(/^stats\./)
    end
  end
end
