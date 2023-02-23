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

    it 'sets the disable_result_info_context to true' do
      expect(session[:disable_result_info_context]).to be_falsey
      patch :update, params: { context: 'result_info' }
      expect(session[:disable_result_info_context]).to be true
    end

    it 'sets the disable_date_sort_context to true' do
      expect(session[:disable_date_sort_context]).to be_falsey
      patch :update, params: { context: 'date_sort_info' }
      expect(session[:disable_date_sort_context]).to be true
    end
  end
end
