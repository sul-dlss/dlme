# frozen_string_literal: true

require 'spec_helper'

describe 'Loading time' do
  before :each do
    visit('/')
    @target_ms = 3000 # "arbitrary target page load time"
  end

  it 'loads the landing page within 3 seconds' do
    # @see https://www.lambdatest.com/blog/how-to-measure-page-load-times-with-selenium/
    # - navigationStart – This attribute returns the time spent after the user agent completes
    #     unloading the previous page/document. If there was no document prior to loading the new page,
    #     navigationStart returns the same value as fetchStart.
    # - responseStart – This attribute returns the time as soon as the user-agent receives the first
    #     byte from the server or from the local sources/application cache.
    # - domComplete – This attribute returns the time just before the current document/page readiness
    #     is set to ‘complete’. document.readyState status as ‘complete’ indicates that the parsing of
    #     the page/document is complete & all the resources required for the page are downloaded. We
    #     will have a look an example of domComplete in subsequent section.
    navigation_start = execute_script('return window.performance.timing.navigationStart')
    response_start = execute_script('return window.performance.timing.responseStart')
    dom_complete = execute_script('return window.performance.timing.domComplete')

    backend_performance_calc = response_start - navigation_start
    frontend_performance_calc = dom_complete - response_start
    #
    # $stderr.puts "Backend: #{backend_performance_calc}"
    # $stderr.puts "Frontend: #{frontend_performance_calc}"

    expect(backend_performance_calc + frontend_performance_calc).to be <= @target_ms
  end

  it 'performs a search' do
    @start_time = Time.now.to_f

    within('.exhibit-search-form') do
      fill_in 'q', with: "Qur'an Manuscripts"
    end

    click_button 'search'

    find 'footer'

    @end_time = Time.now.to_f

    expect(@end_time - @start_time).to be <= @target_ms
  end
end
