# frozen_string_literal: true

# Represents the differnt types of a processing pipelines that are available
class Pipeline < ApplicationRecord
  def self.for(name)
    find_or_create_by(name: name)
  end

  def config
    Settings.import.sources[name]
  end
end
