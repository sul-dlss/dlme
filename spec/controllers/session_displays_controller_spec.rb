# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SessionDisplaysController do
  before do
    request.env['HTTP_REFERER'] = '/'
  end

  describe 'PATCH update' do
    it 'redirects back to referer' do
      patch :update, params: {}
      expect(response).to redirect_to('/')
    end

    it 'sets the disable_search_context to true' do
      expect(session[:disable_search_context]).to be_falsey
      patch :update, params: { context: 'result_info' }
      expect(session[:disable_search_context]).to eq true
    end

    it 'sets the disable_date_sort_context to true' do
      expect(session[:disable_date_sort_context]).to be_falsey
      patch :update, params: { context: 'date_sort_info' }
      expect(session[:disable_date_sort_context]).to eq true
    end
  end
end
