# frozen_string_literal: true

class ApplicationJob < ActiveJob::Base
  # explicitly set the queue name in order to trigger
  # rails queue name prefix behavior.
  queue_as ActiveJob::Base.default_queue_name
end
