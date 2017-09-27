# frozen_string_literal: true

# Model for a single harvest of data
class Harvest < ApplicationRecord
  has_many :harvested_resources, dependent: :destroy
end
